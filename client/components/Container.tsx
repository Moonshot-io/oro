import styled from 'styled-components';
export const Container = styled.div`
  background-color: ${(props: { theme: { background: string } }) =>
    props.theme.background};
  height: 100%;
  display: 'flex';
`;
