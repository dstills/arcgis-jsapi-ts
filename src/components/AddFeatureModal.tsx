import React, { useRef, useEffect, useState } from 'react'
import { Container, ModalHeader, ModalBody, ModalFooter, Modal, Button, Table, Input } from 'reactstrap'

interface AddFeatureModalProps {
    isModalOpen: boolean
    newFeature: {
        type: string
        geometry: {
            type: string
            coordinates: [number, number]
        }
        properties: {
            [key: string]: string
        }
    }
    onToggleModal: (feature: any) => void
    onAddFeature: (feature: any) => void
}

const AddFeatureModalComponent: React.FC<AddFeatureModalProps> = ({ isModalOpen, newFeature, onToggleModal, onAddFeature }) => {
    const [editedFeature, setEditedFeature] = useState<any>(newFeature)
    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setEditedFeature({ ...editedFeature,
            properties: {
                ...editedFeature.properties,
                [name]: value
            }
        })
    }
    const handlePropertyChange = (oldName: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const { value: newName } = event.target
        if (oldName !== newName) {
            const updatedProperties = { ...editedFeature.properties }
            updatedProperties[newName] = updatedProperties[oldName]
            delete updatedProperties[oldName]
            setEditedFeature({ ...editedFeature,
                properties: updatedProperties
            })
        }
    }
    const addPropertyRow = () => {
        const newProperty = `property${Object.keys(editedFeature.properties).length + 1}`
        setEditedFeature({ ...editedFeature, properties: { ...editedFeature.properties, [newProperty]: 'value' } })
    }

    return <Modal isOpen={isModalOpen} toggle={() => { onToggleModal(editedFeature) }}>
        <ModalHeader toggle={onToggleModal}>Add Feature</ModalHeader>
        <ModalBody>
            <Table bordered>
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(editedFeature.properties).map(([key, value]) => {
                        return <tr>
                            <td><Input value={`${key}`} onChange={ (e) => {handlePropertyChange(key, e) }} /></td>
                            <td><Input type="text" name={key} value={`${value}`} onChange={handleValueChange} /></td>
                        </tr>
                    })}
                </tbody>
                <Button color='info' onClick={addPropertyRow}>Add Property</Button>
            </Table>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={() => {
                onAddFeature(editedFeature)
                onToggleModal(editedFeature)
            }}>Add Feature</Button>{' '}
            <Button color="secondary" onClick={() => {
                setEditedFeature(newFeature)
                onToggleModal(editedFeature)
            }}>Cancel</Button>
        </ModalFooter>
    </Modal>
}

export default AddFeatureModalComponent