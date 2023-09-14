/// <reference types="arcgis-js-api" />

import React, { useRef, useEffect, useState } from 'react'
import Map from '@arcgis/core/Map'
import SceneView from '@arcgis/core/views/SceneView'
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer'
import Camera from '@arcgis/core/Camera'
import Collection from '@arcgis/core/core/Collection'
import reactiveUtils from '@arcgis/core/core/reactiveUtils'
import Handles from '@arcgis/core/core/Handles'
import Evented from '@arcgis/core/core/Evented'
import '../styles/ArcGISMap.scss'

type MapProps = {
    position: __esri.PointProperties
    tilt: number
    heading: number
    isEditing: boolean
    layers: string[]
}

const ArcGISMap: React.FC<MapProps> = ({ position, tilt, heading, isEditing, layers }) => {
    const sceneContainerRef = useRef<HTMLDivElement | null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [newFeature, setNewFeature] = useState<any>(null)
    const [viewInstance, setViewInstance] = useState<__esri.SceneView | null>(null)
    const toggleModal = (feature: any) => {
        setIsModalOpen(!isModalOpen)
        setNewFeature(feature)
    }

    const addFeature = async (feature: __esri.Feature) => {
        try {
            const response = await fetch(layers[0], {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(feature)
            })
            if (!response.ok) throw new Error(response.statusText)
            const featureCollection = await response.json()
            console.log('Success! New feature added: ', featureCollection)
            if (viewInstance) {
                const layer = viewInstance.map.findLayerById('photos') as __esri.GeoJSONLayer
                layer.applyEdits({
                    addFeatures: [featureCollection]
                })
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if (sceneContainerRef.current) {
            const map = new Map({
                basemap: 'satellite',
                ground: 'world-elevation'
            })
            const view = new SceneView({
                container: sceneContainerRef.current,
                map: map,
                camera: new Camera({
                    position: position,
                    tilt: tilt,
                    heading: heading
                })
            })
            const photosLayer = new GeoJSONLayer({
                url: layers[0],
                id: 'photos',
                title: 'Photos',
                popupTemplate: {
                    title: '{timestamp}',
                    content: "<img src='http://localhost:3001/images/{filename}' />"
                }
            })
            map.add(photosLayer)
            view.when(() => {
                setViewInstance(view)
            })
            return () => {
                viewInstance?.destroy()
            }
        }
    }, [sceneContainerRef])

    return (
        <div className="arcgis-map">
            <div className="scene-container" ref={sceneContainerRef}></div>
        </div>
    )
}

export default ArcGISMap