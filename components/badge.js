import styled from "styled-components";

const Badge = styled.div`
  background: ${(props) => props.theme.colors.green};
  padding: 0 ${(props) => props.theme.space.m};
  border-radius: 15px;

  @media (max-width:  ${(props) => props.theme.breakpoints.xs}px) {
    min-width: 140px;
    text-align: center;
    justify-content: flex-end;
  }
`;

export default Badge;