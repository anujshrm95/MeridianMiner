/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import star from "./../../assets/hero/star.png";
import {
  setCurrentCitationTab,
  setShowCitationTab,
} from "../../redux/slices/chatSlice";
import { useState } from "react";
const ReqCard = ({ query }) => {
  return (
    <div className="flex justify-end">
      <div className="req_card max-w-[1000px] font-medium text-left">
        {query}
      </div>
    </div>
  );
};
const ResCard = ({ response }) => {
  const dispatch = useDispatch();
  const [showAllCitations, setShowAllCitations] = useState(false);

  const handleCitationClick = (citations) => {
    dispatch(setCurrentCitationTab(citations));
    dispatch(setShowCitationTab(true));
  };

  const toggleShowAllCitations = () => {
    setShowAllCitations(!showAllCitations);
  };

  const citationsToShow = showAllCitations
    ? response?.citation_dict
    : response?.citation_dict.slice(0, 3);

  return (
    <div className="flex flex-col flax-wrap query_card justify-start max-w-[600px] gap-4">
      <img src={star} className="w-[24px]" />
      <span className="font-medium text-left"> {response?.bot_answer}</span>
      <div className="flex flex-wrap gap-2 items-center">
        <span className="font-bold">Citations</span> :{" "}
        {citationsToShow.map((citations) => {
          return (
            <button
              key={uuidv4(citations)}
              onClick={() => handleCitationClick(citations)}
              className="px-2 py-1 text-accent font-bold bg-[#878adf65]"
            >
              {citations.file_name} {citations.page_numbers}
            </button>
          );
        })}
        {response?.citation_dict.length > 3 && (
          <button
            onClick={toggleShowAllCitations}
            className="px-2 py-1 text-accent font-bold underline"
          >
            {showAllCitations ? "Show Less" : "Show All"}
          </button>
        )}
      </div>
    </div>
  );
};
export { ResCard, ReqCard };
