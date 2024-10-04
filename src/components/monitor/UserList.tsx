import { Table } from "@mantine/core";
import React from 'react'
import { ModalSendMessage } from "./ModalSendMessage.tsx";

export const UserList = ({data, screens, sendScreenToUser, sendTextToUser}) => {

    const rowsList = Array.from(new Set((data.map(item => Object.keys(item.data))).flat(1)))

    const status = (status: boolean) => {
        if(status) return 'Active ✅'
        return 'Stoped by user ❌'
    }

    const top = (data) => {

      const itemTop = (item, index) => {
        if(item === 'startTime'){
          return <Table.Th key={index}>{item}</Table.Th>
        }
        return <Table.Th key={index}>{'<$>'}{item}{'<$>'}</Table.Th>
      }
      
        return (
            data.map((item, index) => itemTop(item, index))
        )
    }

    const tableItem = (item, index, element) => {
      if(item === 'startTime'){
        return <Table.Td key={index}>{element.data[item] ? new Date(element.data[item]).toLocaleDateString() : ''}</Table.Td>
      }
      return <Table.Td key={index}>{element.data[item] ? element.data[item] : ''}</Table.Td>
    }

    const list = (data, element) => {
        return (
            data.map((item, index) => tableItem(item, index, element))
        )
    }

    
    const currentScreen = (screen) => {
      const res = screens[screens.findIndex(item => item._id.toString() === screen)]
      if(res){
        return res.name + ' ' + (res['variable'] ? '(<$>' + res['variable'] + '<$>)' : '')
      }
      else{
        return 'empty'
      }
    }

    const rows = data.map((element, index) => (
      
      <Table.Tr key={index}>
        <Table.Td>{element._id}</Table.Td>
        <Table.Td>@{element.username}</Table.Td>
        {list(rowsList, element)}
        <Table.Td>{currentScreen(element.screen)}</Table.Td>
        <Table.Td>{status(element.activBot)}</Table.Td>
        <Table.Td><ModalSendMessage screens={screens} activ={element.activBot} username={element.username} userId={element.id} user={element._id} sendScreenToUser={sendScreenToUser} sendTextToUser={sendTextToUser}/></Table.Td>
      </Table.Tr>
      
    ))
    
      return (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>id</Table.Th>
              <Table.Th>username</Table.Th>
              {top(rowsList)}
              <Table.Th>Screen</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Message</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      )
    
}