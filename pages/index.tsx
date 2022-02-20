import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import type { NextPage } from 'next'
import { styled } from '@mui/material/styles';
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

interface Data {
  supportPoint: string
  neighborhood: string
  immediateNeed: string
  immediateAvailability: string
  needVolunteers: string
  accountable: string
  contact: string
  address: string
  accessType: string
  effectiveContact: string
  pointType: string
  lastUpdate: string
}

function getData(): Promise<[Data]> {
  return fetch('https://opensheet.elk.sh/1_Qhq4i5MzPpheKfTEBi_559Q5l07ntAN1Ko3KTVbDUE/P%C3%A1gina1')
  .then(res => res.json())
  .then(res => {
    return res.map((data: any) => {
      return {
        supportPoint: data['PONTO DE APOIO'],
        neighborhood: data['  BAIRRO'],
        immediateNeed: data['NECESSIDADE IMEDIATA'],
        immediateAvailability: data['DISPONIBILIDADE IMEDIATA'],
        needVolunteers: data['PRECISA DE VOLUNTÁRIOS'],
        accountable: data['RESPONSÁVEL'],
        contact: data['CONTATO'],
        address: data['ENDEREÇO'],
        accessType: data['TIPO DE ACESSO'],
        effectiveContact: data['CONTATO EFETIVO?'],
        pointType: data['TIPO DE PONTO'],
        lastUpdate: data['ÚLTIMA ATUALIZAÇÃO'],
      }
    }).filter((data: Data) => data.supportPoint !== undefined)
  })
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Home: NextPage = () => {
  let [isLoading, setIsLoading] = useState(true)
  let [data, setData] = useState<[Data]>()

  useEffect(() => {
    getData()
      .then(res => {
        setData(res)
        setIsLoading(false)
       })
  })

  if (isLoading) {
    return <h2>Carregando...</h2>
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader sx={{ minWidth: 320 }} size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell align='right'>Ponto de Apoio</StyledTableCell>
              <StyledTableCell align='right'>Bairro</StyledTableCell>
              <StyledTableCell align='right'>Necessidade Imediata</StyledTableCell>
              <StyledTableCell align='right'>Disponibilidade Imediata</StyledTableCell>
              <StyledTableCell align='right'>Precisa de Voluntários?</StyledTableCell>
              <StyledTableCell align='right'>Responsável</StyledTableCell>
              <StyledTableCell align='right'>Contato</StyledTableCell>
              <StyledTableCell align='right'>Endereço</StyledTableCell>
              <StyledTableCell align='right'>Tipo de Acesso</StyledTableCell>
              <StyledTableCell align='right'>Contato Efetivo?</StyledTableCell>
              <StyledTableCell align='right'>Tipo de Ponto</StyledTableCell>
              <StyledTableCell align='right'>Última Atualização</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map(value => (
              <StyledTableRow
                key={value.supportPoint}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component='th' scope='row'>{value.supportPoint}</StyledTableCell>
                <StyledTableCell align="right">{value.neighborhood}</StyledTableCell>
                <StyledTableCell align="right">{value.immediateNeed}</StyledTableCell>
                <StyledTableCell align="right">{value.immediateAvailability}</StyledTableCell>
                <StyledTableCell align="right">{value.needVolunteers}</StyledTableCell>
                <StyledTableCell align="right">{value.accountable}</StyledTableCell>
                <StyledTableCell align="right">{value.contact}</StyledTableCell>
                <StyledTableCell align="right">{value.address}</StyledTableCell>
                <StyledTableCell align="right">{value.accessType}</StyledTableCell>
                <StyledTableCell align="right">{value.effectiveContact}</StyledTableCell>
                <StyledTableCell align="right">{value.pointType}</StyledTableCell>
                <StyledTableCell align="right">{value.lastUpdate}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default Home
