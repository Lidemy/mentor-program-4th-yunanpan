import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentFilter } from "../../redux/selectors";
import { setFilter, clearAll } from "../../redux/actions";

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;
const FilterButton = styled.button`
  padding: 5px 0;
  width: 120px;
  border-radius: 3px;
  border: none;
  color: #d05a6e;
  border: 1px solid #fedfe1;
  background: transparent;
  transition: all 1s ease-out;
  cursor: pointer;
  outline: none;

  & + & {
    margin-left: 5px;
  }

  ${(props) =>
    props.$active &&
    `
    background: #fedfe1;
  `}
`;
const FilterAllButton = styled(FilterButton)``;
const FilterCompletedButton = styled(FilterButton)``;
const FilterIncompleteButton = styled(FilterButton)``;
const ClearAllButton = styled(FilterButton)`
  background: #86473f;
  color: #fcfaf2;
  border: none;
`;

export default function Filter() {
  const dispatch = useDispatch();
  const currentFilter = useSelector(selectCurrentFilter);

  return (
    <FilterWrapper>
      <FilterAllButton
        $active={currentFilter === "all"}
        onClick={() => dispatch(setFilter("all"))}
      >
        all
      </FilterAllButton>
      <FilterCompletedButton
        $active={currentFilter === "completed"}
        onClick={() => dispatch(setFilter("completed"))}
      >
        completed
      </FilterCompletedButton>
      <FilterIncompleteButton
        $active={currentFilter === "incomplete"}
        onClick={() => dispatch(setFilter("incomplete"))}
      >
        incomplete
      </FilterIncompleteButton>
      <ClearAllButton onClick={() => dispatch(clearAll())}>
        clear all
      </ClearAllButton>
    </FilterWrapper>
  );
}
