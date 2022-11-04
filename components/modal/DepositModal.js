import React, {useState} from 'react'
import styled from 'styled-components'
import Deposit from './Deposit'
import CoinSelector from './CoinSelector'



export const DepositModal = ({sanityTokens, thirdWebTokens, walletAddress}) => {
    // Deposit fiat to crypto
    const [action, setAction] = useState('deposit')
    const [selectedToken, setSelectedToken] = useState(sanityTokens[0])


    const selectedStyle = {
        color: '#3773f5',
      }

    const unselectedStyle = {
    border: '1px solid #282b2f',
    }

    const selectedModal = option => {
        switch (option) {
            case 'deposit':
                return ( <Deposit
                    selectedToken={selectedToken}
                    setAction={setAction}
                    thirdWebTokens={thirdWebTokens}
                    walletAddress={walletAddress}
                    />
                )
            case 'select':
                return (
                    <CoinSelector
                    setAction={setAction}
                    selectedToken={selectedToken}
                    setSelectedToken={setSelectedToken}
                    sanityTokens={sanityTokens}
                    thirdWebTokens={thirdWebTokens}
                    walletAddress={walletAddress}
                    />
                )
            case 'withdraw':
                return <h2>Withdraw</h2>
            default:
                return <h2>Deposit</h2>
        }
    }

  return (
    <Wrapper>
        <Selector>
            <Option
                style={action === 'deposit' ? selectedStyle : unselectedStyle}
                onClick={() => setAction('deposit')}
            >
               <p>Deposit</p>
            </Option>
            <Option
                style={action === 'withdraw' ? selectedStyle : unselectedStyle}
                onClick={() => setAction('withdraw')}
            >
                <p>Withdraw</p>
            </Option>
        </Selector>
        <ModalMain>
            {selectedModal(action)}
        </ModalMain>

    </Wrapper>
  )
}

export default DepositModal

const Wrapper = styled.div`
  height: 35rem;
  width: 27rem;
  color: white;
  border: 1px solid #282b2f;
  display: flex;
  flex-direction: column;
`
const Selector = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 5rem;
`
const Option = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  font-size: 1.2rem;
  font-weight: 600;
  &:hover {
    cursor: pointer;
    background-color: #111214;
  }
`
const ModalMain = styled.div`
  padding: 1rem;
  flex: 1;
`