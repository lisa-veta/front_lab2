import styled, { keyframes } from 'styled-components';
import React, {useState, useRef, useEffect} from 'react';

const grow = keyframes`
  from {
      width: 10px;
      height: 10px;
      border-radius: 50%;
  }
  to {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
`;

const decrease = keyframes`
  from {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  to {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
`;

const PriorityItem = styled.div`
    display: inline-block;
    width: ${props => (props.selected ? '20px' : '10px')};
    height: ${props => (props.selected ? '20px' : '10px')};
    border-radius: 50%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: ${props => (props.selected ? '20px' : '10px')};
    cursor: pointer;
    transition: 0.3s ease;
    animation: ${props => (props.selected ? grow : decrease)} 0.3s ease;
`;

const PriorityContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;  
  gap: 5px;
    min-height: 20px;
`;
const priorities = [
    { color: 'var(--colorGreen)', value: 'low' },
    { color: 'var(--colorYellow)', value: 'medium' },
    { color: 'var(--colorRed)', value: 'high' },
];

export const Priorities = ({ priority, setPriority }) => {

    const [selectedPriority, setSelectedPriority] = useState(priority);

    const handlePriorityClick = (priority) => {
        if (selectedPriority === priority) {
            setSelectedPriority(null);
            setPriority(null);
        } else {
            setSelectedPriority(priority);
            setPriority(priority);
        }
    };

    const sortedPriorities = [
        ...priorities.filter(p => p.value === selectedPriority),
        ...priorities.filter(p => p.value !== selectedPriority),
    ];
    return  (
        <PriorityContainer>
            {sortedPriorities.map(({ color, value }) => (
                <PriorityItem
                    key={value}
                    style={{ backgroundColor: color }}
                    selected={selectedPriority === value}
                    onClick={() => handlePriorityClick(value)}
                />
            ))}
        </PriorityContainer>
    );
}

export const PriorityFilter = ({ setFilterPriority }) => {
    const [selectedPriority, setSelectedPriority] = useState(null);

    const handlePriorityClick = (priority) => {
        if (selectedPriority === priority) {
            setSelectedPriority(null); // Сброс приоритета
        } else {
            setSelectedPriority(priority);
        }
        setFilterPriority(selectedPriority === priority ? null : priority);
    };

    return (
        <PriorityContainer>
            {priorities.map(({ color, value }) => (
                <PriorityItem
                    key={value}
                    style={{ backgroundColor: color }}
                    selected={selectedPriority === value}
                    onClick={() => handlePriorityClick(value)}
                />
            ))}
        </PriorityContainer>
    );
};