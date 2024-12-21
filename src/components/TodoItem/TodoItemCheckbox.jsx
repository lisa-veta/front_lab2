import styled, {css} from "styled-components";

const disabledCss = css`
  background-color: var(--colorPlatinum);
  border-width: 0px;
`

const checkedCss = css`
  border-color: var(--colorFrenchGray);
  background-color:  var(--colorFrenchGray);
  background-image: url(assets/images/svg/todo-done.svg);
  background-position: center;
  background-repeat: no-repeat;
`

export const CheckboxContainer = styled.span(props => {
  return `
    display: inline-block;
    min-width: 20px;
    min-height: 20px;
    border: 2px solid var(--colorSilver);
    border-radius: 6px;
    cursor: pointer;
    ${props.disabled ? disabledCss : ''}
    ${props.checked ? checkedCss : ''}
  `;
});


export const TodoItemCheckbox = ({disabled, checked, onChange}) => {
  return <CheckboxContainer disabled={disabled} checked={checked} onClick={onChange} />
}