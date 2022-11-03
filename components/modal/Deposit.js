import React, {useState} from 'react'
import styled from 'styled-components'
import { FaPhoneAlt } from 'react-icons/fa'


export const Deposit = () => {
    const [amount, setAmount] = useState()
    const [mobileNumber, setMobileNumber] = useState('')


  return (
    <Wrapper>
        <Amount>
            <FlexInputContainer>
                <FlexInput placeholder="0"
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                />
                <span>KES</span>
            </FlexInputContainer>
            <Warning style={{ color: amount && '#0a0b0d' }}>
                 Amount is a required field
            </Warning>
        </Amount>
        <TransferForm>
            <Row>
                <FieldName>No.</FieldName>
                <Icon>
                    <FaPhoneAlt/>
                </Icon>
                <Recipient
                    placeholder="+254..."
                    value={mobileNumber}
                    onChange={e => setMobileNumber(e.target.value)}
                />
            </Row>
            <Divider/>
            <Row>
                <FieldName>Receive</FieldName>
                <CoinSelectList>
                    <Icon>
                        <img
                            src='https://images.unsplash.com/photo-1640833906651-6bd1af7aeea3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGNyeXB0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'/>
                    </Icon>
                    <CoinName>USDC</CoinName>
                </CoinSelectList>
            </Row>
        </TransferForm>
        <Row>
            <Continue>Continue</Continue>
        </Row>
        <Row>
            <BalanceTitle>USDC Balance</BalanceTitle>
            <Balance>0.00</Balance>
        </Row>
    </Wrapper>
  )

}

export default Deposit

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`
const Amount = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`
const FlexInputContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  & > span {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    color: #3773f5;
  }
`
const FlexInput = styled.input`
  border: none;
  background: none;
  outline: none;
  color: white;
  font-size: 1.2rem;
  text-wrap: wrap;
  text-align: right;
  max-width: 45%;
  margin-right: 1rem;
  font-size: 4.5rem;
  color: #3773f5;
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`
const Warning = styled.div`
  /* TRouBLe */
  padding: 1rem 0 2rem 0;
  text-align: center;
  color: #ff0f0f;
`
const TransferForm = styled.div`
  border: 1px solid #282b2f;
  border-radius: 0.4rem;
`
const Divider = styled.div`
border-bottom: 1px solid #282b2f;
`

const Row = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
color: #8a919e;
padding: 1rem 0;
font-size: 1.2rem;
`
const FieldName = styled.div`
flex: 0.5;
padding-left: 2rem;
`

const Icon = styled.div`
margin-right: 1rem;
height: 1.8rem;
width: 1.8rem;
border-radius: 50%;
overflow: hidden;
display: grid;
place-items: center;
& > img {
  /* margin: -0.5rem 1rem; */
  height: 120%;
  width: 120%;
  object-fit: cover;
}
`

const Recipient = styled.input`
flex: 1;
border: none;
background: none;
outline: none;
color: white;
font-size: 1.2rem;
text-wrap: wrap;
margin-right: 0.5rem;
`
const CoinSelectList = styled.div`
display: flex;
flex: 1.3;
height: 100%;
&:hover {
  cursor: pointer;
}
`

const CoinName = styled.div`
flex: 1;
border: none;
background: none;
outline: none;
color: white;
font-size: 1.2rem;
text-wrap: wrap;
margin-right: 0.5rem;
`

const Continue = styled.button`
color: white;
width: 100%;
background-color: #3773f5;
padding: 1rem;
text-align: center;
border-radius: 0.4rem;
font-size: 1.2rem;
&:hover {
  cursor: pointer;
  background-color: #4a80f6;
}
`
const BalanceTitle = styled.div``

const Balance = styled.div``