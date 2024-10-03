import { Button, Image, Table } from "@mantine/core"
import React from 'react'

export const ContentList = ({data}) => {

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

    const rows = data.map((element, index) => (
      
      <Table.Tr key={index}>
        
        <Table.Td>{element.tx}</Table.Td>
        <Table.Td>{element.type}</Table.Td>
        <Table.Td>{prewieImage(element)}</Table.Td>
        
        <Table.Td> <Button 
            variant="default" 
            size="xs"
            onClick={() => {
              // deleteContent(element)
            }}>
              Send to
        </Button>
          <Button
          variant="default" 
          size="xs"
          onClick={() => {
            // deleteContent(element)
          }}>
            Send me
        </Button>
          <Button 
          variant="default" 
          size="xs"
          onClick={() => {
            // deleteContent(element)
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