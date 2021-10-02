import { useState } from 'react';
import './App.css';
import styled from 'styled-components';
import logo from '../images/logo.svg';
import TipButton from './TipButtons';
import person from '../images/icon-person.svg';
import dollar from '../images/icon-dollar.svg';

const tips = [5, 10, 15, 25, 50];
// console.log(window.innerWidth);

function App() {
  return (
    <Container>
      <img src={logo} alt='logo' />
      <Calculator className='calculator'>
        <BillSection className='bottomSpacing'>
          <h3>Bill</h3>
          <InputContainer>
            <img src={dollar} />
            <TaxInput className='textbox' type='tel'></TaxInput>
          </InputContainer>
        </BillSection>
        <TipSection className='bottomSpacing'>
          <h3>Select Tip %</h3>
          <ButtonSection className='bottomSpacing'>
            {tips.map((tip) => {
              return <TipButton value={tip} key={tip} />;
            })}
            <TipInput className='textbox' placeholder='Custom' type='tel' />
          </ButtonSection>
          <h3>Number of People</h3>
          <InputContainer>
            <img src={person} />
            <PeopleInput className='textbox' type='tel'></PeopleInput>
          </InputContainer>
        </TipSection>
        <ResultCard className='bottomSpacing'>
          <TipAmount>
            <p>
              Tip Amount
              <span>/ person</span>
            </p>
            <h2>$4.27</h2>
          </TipAmount>
          <Total>
            <p>
              Total
              <span>/ person</span>
            </p>
            <h2>$32.27</h2>
          </Total>
          <button>Reset</button>
        </ResultCard>
      </Calculator>
    </Container>
  );
}

const Container = styled.div`
  background-color: hsl(185, 41%, 84%);
  /* height: 100vh; */
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  /* justify-content: center; */
  align-items: center;
  padding-top: 3em;
`;

const Calculator = styled.div`
  margin-top: 3em;
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: white;
  padding: 2em;
  width: 100%;
  height: 100%;
  justify-content: space-between;

  h3 {
    color: hsl(186, 14%, 43%);
    font-size: 1em;
    margin-bottom: 0.5em;
  }
`;
const BillSection = styled.section``;
const TaxInput = styled.input``;
const TipSection = styled.section``;
const ButtonSection = styled.section`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 1em;

  button {
    width: 100%;
    display: block;
    background-color: hsl(183, 100%, 15%);
    color: white;

    &:hover {
      background-color: hsl(172, 67%, 60%);
      color: hsl(183, 100%, 15%);
    }
    /* margin-top: 1em; */
    /* margin-right: 0.5em; */
  }
`;
const TipInput = styled.input`
  ::placeholder {
    color: hsl(186, 14%, 43%);
  }
`;
const PeopleInput = styled.input``;
const ResultCard = styled.section`
  background-color: hsl(183, 100%, 15%);
  border-radius: 1em;
  padding: 1em;
  color: hsl(189, 41%, 97%);

  button {
    padding: 0.7em 1em;
    text-transform: uppercase;
    background-color: hsl(172, 67%, 45%);
    color: hsl(183, 100%, 15%);
    width: 100%;
    /* margin-top: 1em; */

    &:hover {
      background-color: hsl(172, 67%, 80%);
    }
  }
`;
const TipAmount = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2em 0;

  p {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    font-weight: 700;
    font-size: 0.9em;

    span {
      margin-top: 0.3em;
      color: hsl(184, 14%, 56%);
      font-size: 0.8em;
    }
  }
  h2 {
    font-size: 1.8em;
    color: hsl(172, 67%, 45%);
  }
`;
const Total = styled(TipAmount)``;

const InputContainer = styled.section`
  position: relative;

  img {
    position: absolute;
    z-index: 1;
    top: 18px;
    left: 1em;
  }
`;
export default App;
