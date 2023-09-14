import React, { useState, useEffect, useRef } from 'react'
import { Container, Row, Col, Button, Card, CardBody, CardTitle } from 'reactstrap'
import '../styles/Toolbar.scss'

// interface ToolbarProps {
//     onToggleEditing: () => void
//     isToolbarActive: boolean
//     isEditing: boolean
//     photosUrl: string
//     photoClick: (url: string) => void
// }

type ToolbarProps = {
    onToggleEditing: () => void
    isToolbarActive: boolean
    isEditing: boolean
    photosUrl: string
    photoClick: React.MouseEventHandler<HTMLImageElement>
}

const ToolbarComponent: React.FC<ToolbarProps> = ({ onToggleEditing, isToolbarActive, isEditing, photosUrl, photoClick }) => {
    const dashboardRef = useRef<HTMLDivElement | null>(null)
    const [imgs, setImgs] = useState<string[]>([])
    useEffect(() => {
        fetch(photosUrl)
        .then(res => res.json())
        .then(data => {
            const urls = data.features.map((feature: any) => {
                return `http://localhost:3001/thumbnails/${feature.properties.filename}?width=75&height=75`
            })
            setImgs(urls)
        })
    }, [dashboardRef])
    const photoCards = imgs.map((url: string) => {
        return <Card className='toolbar-card'>
            <CardBody>
                <img src={url} onClick={photoClick}/>
            </CardBody>
        </Card>
    })
    return isToolbarActive && <Container className='toolbar fixed-bottom bg-light border' fluid>
        <Row xs='2'>
            <Col className='bg-light border'>
                <div ref={dashboardRef} className='toolbar-dashboard'>
                    {photoCards}
                </div>
            </Col>
            <Col className='toolbar-tools bg-light border d-flex'>
                <Button className='m-auto' onClick={onToggleEditing} color={isEditing ? 'danger' : 'primary'}>{isEditing ? 'Stop Editing' : 'Start Editing'}</Button>
            </Col>
        </Row>
    </Container>
}

export default ToolbarComponent