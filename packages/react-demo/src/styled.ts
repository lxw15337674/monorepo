import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100px;
  line-height: 20px;
  display: inline-flex;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &::after {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0 20px 0 10px;
    content: '...';
  }
`;
