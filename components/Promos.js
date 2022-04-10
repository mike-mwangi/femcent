import styled from 'styled-components'

const Promos = () => {
  return (
    <Wrapper>
      <OfferCard>
        <Title>Yield earned</Title>
        <Description>Earn upto 12.84% yearly interest on your coins</Description>
        <Placeholder />
        <Additional style={{ fontSize: '1.5rem' }}>
           <span>12.84% APY</span>
        </Additional>
      </OfferCard>

      <OfferCard>
        <Title>Tutorials</Title>
        <Description>Learn more about the blockchain here</Description>
        <Placeholder />
        <Additional style={{ color: '#3773f5' }}><a href="https://www.youtube.com/watch?v=pm2WPY8RG9s&list=PLlrxD0HtieHi99pmroflQ2BUURV_qQa47">Watch</a></Additional>
      </OfferCard>

      <OfferCard>
        <Title>History of Assets</Title>
        <Description>View historical data of assets here</Description>
        <Placeholder />
        <Additional style={{ color: '#3773f5' }}><a href="https://coinmarketcap.com/currencies/tether/">View Charts</a></Additional>
      </OfferCard>
    </Wrapper>
  )
}

export default Promos

const Wrapper = styled.div`
  margin-top: 2rem;
  padding-right: 1rem;
`

const OfferCard = styled.div`
  width: 21rem;
  height: 11rem;
  border: 1px solid #282b2f;
  margin-bottom: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 0.1rem;
`

const Description = styled.div`
  font-size: 1.1rem;
`

const Placeholder = styled.div`
  flex: 1;
`

const Additional = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > span {
    color: #8a919e !important;
    font-size: 1rem;
  }
`