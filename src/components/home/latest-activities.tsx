import { UnorderedListOutlined } from '@ant-design/icons'
import { Card, List, Space } from 'antd'
import { Text } from '../text'
import LatestActivitiesSkeleton from '../skeleton/latest-activities'
import { DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY, DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY } from '@/graphql/queries'
import { useList } from '@refinedev/core'
import dayjs from 'dayjs'
import CustomAvatar from '../custom-avatar'

const LatestActivities = () => {
    
    const { data: audit, isLoading: isLoadingAudit, isError, error } = useList({
        resource: "audits", 
        meta: {
            gqlQuery: DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY
        }
    })

    const dealIds = audit?.data?.map((audit) => audit?.targetId); 

    const { data: deals, isLoading: isLoadingDeals } = useList({
        resource: "deals", 
        queryOptions: { enabled: !!dealIds?.length}, 
        pagination: {
            mode: "off"
        }, 
        filters: [{ field: "id", operator: "in", value: dealIds }], 
        meta: {
            gqlQuery: DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY
        }
    })


    console.log(audit?.data); 
    console.log(deals); 


    if (isError) {
        console.log(error);
        return null; 
    }

    const isLoading = isLoadingAudit || isLoadingDeals; 


  return (
    <Card
        styles={{ header: { padding: "16px"}, 
                  body: { padding: "0 1rem"}}}  
        title={(
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <UnorderedListOutlined />
                <Text size="sm" style={{ marginLeft: "0.5rem"}}>
                    Latest Activities
                </Text>
            </div>
        )}
    >
        {isLoading ? (
            <List 
                itemLayout='horizontal'
                dataSource={Array.from({ length: 5}).map((_, i) => ({id: i}) )}
                renderItem={(_, index) => (
                    <LatestActivitiesSkeleton key={index}/>
        )}
            />
        ) : (
            <List 
                itemLayout="horizontal"
                dataSource={audit?.data}
                renderItem={(item) => {
                    const deal = deals?.data.find((deal) => deal.id === String(item.targetId))  || undefined; 
                    
                    return (
                        <List.Item>
                            <List.Item.Meta 
                                title={dayjs(deal?.createdAt).format("MMM DD, YYYY - HH:mm")}
                                avatar={
                                    <CustomAvatar 
                                        shape="square"
                                        size={48}
                                        src={deal?.company.avatarUrl}
                                        name={deal?.company.name}
                                    />
                                }
                                description={
                                    <Space size={4}>
                                        <Text>
                                        <strong>{item.user?.name}</strong>{" "}
                                        {item.action === "CREATE" ? "created" : "moved"}{" "}
                                        <strong>{deal?.title}</strong> deal{" "}
                                        {item.action === "CREATE" ? "in" : "to"}{" "}
                                        <strong>{deal?.stage?.title}</strong>
                                        </Text>
                                    </Space>
                                }
                            />
                        </List.Item>
                    )
                }}
            />
        )}
    </Card>
  )
}

export default LatestActivities