import { Button, Table } from "@mantine/core";
import React from 'react'

export const UserList = ({data}) => {
  console.log(data)

    const rowsList = Array.from(new Set((data.map(item => Object.keys(item.data))).flat(1)))
    console.log(rowsList)

    const status = (status) => {
        if(status) return 'Active ✅'
        return 'Stoped by user ❌'
    }

    const top = (data) => {
        return (
            data.map((item, index) => <Table.Th key={index}>{'<$>'}{item}{'<$>'}</Table.Th>)
        )
    }

    const list = (data, element) => {
        return (
            data.map((item, index) => <Table.Td key={index}>{element.data[item] ? element.data[item] : ''}</Table.Td>)
        )
    }

    const rows = data.map((element, index) => (
        <Table.Tr key={index}>
          <Table.Td>{element._id}</Table.Td>
          <Table.Td>@{element.username}</Table.Td>
          {list(rowsList, element)}
          <Table.Td>{status(element.activBot)}</Table.Td>
          <Table.Td><Button variant="default" size="xs"
          disabled={!element.activBot}
            onClick={() => {
            }}>
            Send message
          </Button></Table.Td>
        </Table.Tr>
      ))
    
      return (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>id</Table.Th>
              <Table.Th>username</Table.Th>
              {top(rowsList)}
              <Table.Th>Status</Table.Th>
              <Table.Th>Message</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      )

}