import { Button, Grid, Group, Image, Table, TextInput } from "@mantine/core"
import React, { useState } from 'react'

export const ContentList = ({data, deleteContent, sendMeContent, renameMeContent}) => {

  const [rename, setRename] = useState({})

    const prewieImage = (element) => {
      if(element.type === 'photo'){
        if(element.buffer){
          return (
            <Image
              src={`data:image/jpeg;base64,${element.buffer}`}
              radius="sm"
              h='4.5vmax'
              w="auto"
            />
          )
        }
        return 'no'
      }
      else if(element.type === 'text'){
        return element.media
      }
      return 'no'
    }

    const renameContent = (element, index) => {
      console.log(rename)
      if(rename['index'] === index){
        return (
          <Grid justify="space-between" align="stretch" grow>
             <Grid.Col span={7}>
              <TextInput
                value={rename['newName'] ? rename['newName'] : ''}
                onChange={(event) => {
                  setRename({...rename, newName: event})
                }}
                variant="default" 
                size="xs"
                placeholder={element.tx}
              />
             </Grid.Col>
             <Grid.Col span={2} offset={1}>
              <Button
                variant="default" 
                size="xs"
                onClick={() => renameMeContent(element, rename['newName'])}
                >Save
              </Button>
            </Grid.Col>
            <Grid.Col span={2}>
              <Button
                variant="default" 
                size="xs"
                onClick={() => setRename({})}
                >
                  Cancel
              </Button>
            </Grid.Col>
          </Grid>
        )
      }
      return (
        <div 
          onClick={() => {
            setRename({index: index, newName: ''})
          }}>
          {element.tx ? element.tx : 'noname'}
        </div>
      )
    }

    const rows = data.map((element, index) => (
      
      <Table.Tr key={index}>
        
        <Table.Td>{renameContent(element, index)}</Table.Td>
        {/* <Table.Td>{element.tx}</Table.Td> */}
        <Table.Td>{element.type}</Table.Td>
        <Table.Td>{prewieImage(element)}</Table.Td>
        
        <Table.Td w='5%'>
          <Button
          variant="default" 
          size="xs"
          onClick={() => {
            sendMeContent(element)
          }}>
            Send me
        </Button>
        </Table.Td>
        <Table.Td w='5%'>
          <Button 
          color="red" 
          size="xs"
          onClick={() => {
            deleteContent(element)
          }}>
            Delete
        </Button></Table.Td>

      </Table.Tr>
      
    ))
    
      return (
        <Table highlightOnHover withRowBorders={false}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Media</Table.Th>
              <Table.Th>Preview</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      )
    
}