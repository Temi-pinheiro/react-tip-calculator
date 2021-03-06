import { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import logo from '../images/logo.svg';
import TipButton from './TipButtons';
import person from '../images/icon-person.svg';
import dollar from '../images/icon-dollar.svg';

function App() {
  const tips = [5, 10, 15, 25, 50];

  const [total, setTotal] = useState(0.0);
  const [tipAmount, setTipAmount] = useState(0.0);
  const [bill, setBill] = useState('');
  const [people, setPeople] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    calculateTips();
  }, [tipPercentage, bill, people]);

  const handleBillChange = (e) => {
    setBill(e.target.value);
  };
  const handlePeopleChange = (e) => {
    setPeople(e.target.value);
    const check = document.querySelector('#zero');
    if (e.target.value < 1) {
      check.classList.add('negative');
      setActive(true);
    } else {
      check.classList.remove('negative');
    }
  };

  const handleAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setTipPercentage(e.target.value);
    calculateTips();
  };

  const assignTips = (value) => {
    setTipPercentage(value);
    calculateTips();
  };

  const calculateTips = () => {
    const totalTips = bill > 0 ? bill * (tipPercentage / 100) : 0.0;
    const tipPerPerson = people > 0 ? totalTips / people : 0.0;
    if (bill > 0 && people > 0) {
      setTotal(totalTips);
      setTipAmount(tipPerPerson);
      setDisabled(false);
    }
  };

  const handleResetClick = (e) => {
    setBill('');
    setCustomAmount('');
    setPeople('');
    setTotal(0.0);
    setTipAmount(0.0);
    setDisabled(true);
    setActive(false);
  };

  return (
    <Container>
      <img src={logo} alt='logo' />
      <Calculator className='calculator'>
        <VariablesContainer>
          <BillSection className='bottomSpacing'>
            <h3>Bill</h3>
            <InputContainer>
              <img src={dollar} alt='dollar icon' />
              <BillInput
                className='textbox'
                type='number'
                value={bill}
                onChange={handleBillChange}
                placeholder='0'
              ></BillInput>
            </InputContainer>
          </BillSection>
          <TipSection className='bottomSpacing'>
            <h3>Select Tip %</h3>
            <ButtonSection className='bottomSpacing'>
              {tips.map((tip) => {
                return <TipButton value={tip} key={tip} getTip={assignTips} />;
              })}
              <TipInput
                className='textbox'
                placeholder='Custom'
                type='number'
                value={customAmount}
                onChange={handleAmountChange}
              />
            </ButtonSection>
          </TipSection>

          <PeopleSection>
            <div className='people'>
              <h3>Number of People</h3>
              <h3 id='zero'>Can't be zero</h3>
            </div>
            <InputContainer>
              <img src={person} alt='person icon' />
              <PeopleInput
                className={`${isActive && people < 1 && 'negative'} textbox`}
                type='number'
                value={people}
                onChange={handlePeopleChange}
                placeholder='0'
              ></PeopleInput>
            </InputContainer>
          </PeopleSection>
        </VariablesContainer>

        <ResultCard className='bottomSpacing'>
          <TipAmount>
            <p>
              Tip Amount
              <span>/ person</span>
            </p>
            <h2>${tipAmount.toFixed(2)}</h2>
          </TipAmount>
          <Total>
            <p>
              Total
              <span>/ person</span>
            </p>
            <h2>${total.toFixed(2)}</h2>
          </Total>
          <ResetButton disabled={isDisabled} onClick={handleResetClick}>
            Reset
          </ResetButton>
        </ResultCard>
      </Calculator>
    </Container>
  );
}

const Container = styled.div`
  background-color: hsl(185, 41%, 84%);
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  padding-top: 3em;

  @media (min-width: 960px) {
    padding-top: 8em;
    height: 100%;
  }
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

  @media (min-width: 960px) {
    width: 50%;
    max-height: 28.75em;
    min-height: 28.125em;
    border-radius: 1em;

    flex-direction: row;
    padding: 2em 2em;
    margin-top: 6em;
  }
`;
const BillSection = styled.section``;
const BillInput = styled.input``;
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
      background-color: hsl(172, 67%, 80%);
      color: hsl(183, 100%, 15%);
    }
  }

  @media (min-width: 960px) {
    display: grid;
    grid-template-columns: repeat(3, 33.3%);
    padding-right: 2em;

    button {
      width: 100%;
    }
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
  margin-top: 1em;

  @media (min-width: 960px) {
    flex-grow: 1;
    margin-top: 0;
    padding: 1em 2.5em;
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

const PeopleSection = styled.section`
  .people {
    display: flex;
    justify-content: space-between;

    #zero {
      color: #d49090;
      visibility: hidden;
      opacity: 0;
      transition: all 200ms ease-in-out;
    }

    #zero.negative {
      visibility: visible;
      opacity: 1;
      display: block;
    }
  }
`;

const ResetButton = styled.button`
  padding: 0.7em 1em;
  text-transform: uppercase;
  color: ${(props) => {
    props.disabled ? 'hsl(184, 14%, 56%)' : 'hsl(183, 100%, 15%)';
  }};
  width: 100%;
  margin-top: 5.4em;
  margin-bottom: 1em;
  background-color: ${(props) =>
    props.disabled ? 'hsl(183, 100%, 18%)' : 'hsl(172, 67%, 45%)'};
  &:hover {
    background-color: ${(props) =>
      props.disabled ? 'hsl(183, 100%, 18%)' : 'hsl(172, 67%, 80%)'};
    cursor: ${(props) => (props.disabled ? 'initial' : 'pointer')};
  }

  @media (min-width: 960px) {
    padding: 0.5em 1em;
    margin-bottom: 0.3em;
  }
`;

const VariablesContainer = styled.div`
  @media (min-width: 960px) {
    width: 48%;
    margin-right: 2em;
  }
`;

export default App;
