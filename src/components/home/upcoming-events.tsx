import { CalendarOutlined } from '@ant-design/icons'
import { Card, List } from 'antd'
import { useState } from 'react'
import { Text } from '../text'

const UpcomingEvents = () => {
    const [isLoading, setisLoading] = useState(true)

  return (
    <Card
        style={{ height: "100%" }}
        styles={{ header: { padding: "8px 16px"},
                  body: { padding: "0px 1rem"}}}
        title={
            <div style={{
              display: "flex",
              alignItems: "center", 
              gap: "8px",  
            }}>
                <CalendarOutlined />
                 <Text size='sm' style={{ marginLeft: "0.7"}}>
                    Upcoming Events
                </Text>
            </div>
        }
    >
        { isLoading ? (
            <List
                itemLayout="horizontal"
                dataSource={Array.from({ length: 5}).map((_, index) => ({
                    id: index,
                })) }
            >

            </List>
        ) : (
            <List>

            </List>
        )}
    </Card>
  )
}

export default UpcomingEvents