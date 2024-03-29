import React from "react";
import "./style.css";
import { QuestionData } from "./data/questiondata.js";
import { ResultData } from "./data/resultdata";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { Steps } from "antd";
import { formatCountdown } from "antd/lib/statistic/utils";
const { Step } = Steps;

const Question = () => {
  const [questionNo, setQuestionNo] = useState(0);

  const navigate = useNavigate();

  const [subQ, setSubQ] = useState("");

  const [result, setResult] = useState(ResultData);
  const [resultFood, setResultFood] = useState();

  useEffect(() => {}, []);

  const handleClickButton = (no, type) => {
    const newScore = result.filter((s) => s.contents.includes(type));
    setResult(newScore);
    setSubQ(type);

    if (QuestionData.length !== questionNo + 1) {
      if (QuestionData[questionNo].subquestion === false) {
        setQuestionNo(questionNo + 1);
      } else {
        setQuestionNo(questionNo + 0);
        if (type === "육류") {
          setQuestionNo(questionNo + 1);
        } else {
          setQuestionNo(questionNo + 2);
        }
      }
    } else {
      // food 도출
      const food = newScore
        .sort((a, b) => (a.score > b.score ? -1 : 1))
        .map((item) => item.name);

      // 결과페이지 이동
      // navigate({
      //   pathname: "/result",
      //   search: `?${createSearchParams({
      //     food: food,
      //   })}`,
      // });
      setResultFood(food);
      if (no === 8) {
        if (food.length === 0) {
          navigate("/resultNo", { state: type });
        } else if (food.length > 3) {
          var newnum = [];
          for (var i = 0; i < 3; i++) {
            var movenum = food.splice(
              Math.floor(Math.random() * food.length),
              1
            )[0];
            newnum.push(movenum);
          }

          //결과페이지 이동
          navigate({
            pathname: "/result",
            search: `?${createSearchParams({
              food: newnum,
            })}`,
          });
        } else {
          navigate({
            pathname: "/result",
            search: `?${createSearchParams({
              food: food,
            })}`,
          });
        }
      }
    }
  };

  return (
    <div id="sub_wrap">
      <div className={`button_no${questionNo} question_inner cf`}>
        <div className="question_title">
          <h2>Please choose the one you want.</h2>
          <p>선택지중 원하시는걸 선택해주세요.</p>
        </div>
        <div className={`button_no${questionNo} question_list cf`}>
          <button
            className={`button_no${questionNo}`}
            onClick={() =>
              handleClickButton(
                QuestionData[questionNo].id,
                QuestionData[questionNo].answera
              )
            }
          >
            <div className="btn_inner">
              <img src="./img/main_btn_arrow.png" alt="" className="arrow" />
              <div className="img_wrap">
                <img
                  src={QuestionData[questionNo].imagea}
                  alt=""
                  className="m_none"
                />
                <img
                  src={QuestionData[questionNo].mimagea}
                  alt=""
                  className="pc_none"
                />
              </div>
              <p>“{QuestionData[questionNo].answera}”</p>
            </div>
          </button>

          <button
            className={`button_no${questionNo}`}
            onClick={() => {
              handleClickButton(
                QuestionData[questionNo].id,
                QuestionData[questionNo].answerb
              );
            }}
          >
            <div className="btn_inner">
              <img src="./img/main_btn_arrow.png" alt="" className="arrow" />
              <div className="img_wrap">
                <img
                  src={QuestionData[questionNo].imageb}
                  alt=""
                  className="m_none"
                />
                <img
                  src={QuestionData[questionNo].mimageb}
                  alt=""
                  className="pc_none"
                />
              </div>
              <p>“{QuestionData[questionNo].answerb}”</p>
            </div>
          </button>

          {QuestionData[questionNo].answerc === undefined ? (
            ""
          ) : (
            <button
              className={`button_no${questionNo}`}
              onClick={() =>
                handleClickButton(
                  QuestionData[questionNo].id,
                  QuestionData[questionNo].answerc
                )
              }
            >
              <div className="btn_inner">
                <img src="./img/main_btn_arrow.png" alt="" className="arrow" />
                <div className="img_wrap">
                  <img
                    src={QuestionData[questionNo].imagec}
                    alt=""
                    className="m_none"
                  />
                  <img
                    src={QuestionData[questionNo].mimagec}
                    alt=""
                    className="pc_none"
                  />
                </div>
                <p>“{QuestionData[questionNo].answerc}”</p>
              </div>
            </button>
          )}

          {QuestionData[questionNo].answerd === undefined ? (
            ""
          ) : (
            <>
              <button
                className={`button_no${questionNo}`}
                onClick={() =>
                  handleClickButton(
                    QuestionData[questionNo].id,
                    QuestionData[questionNo].answerd
                  )
                }
              >
                <div className="btn_inner">
                  <img
                    src="./img/main_btn_arrow.png"
                    alt=""
                    className="arrow"
                  />
                  <div className="img_wrap">
                    <img
                      src={QuestionData[questionNo].imaged}
                      alt=""
                      className="m_none"
                    />
                    <img
                      src={QuestionData[questionNo].mimaged}
                      alt=""
                      className="pc_none"
                    />
                  </div>
                  <p>“{QuestionData[questionNo].answerd}”</p>
                </div>
              </button>
              <button
                className={`button_no${questionNo}`}
                onClick={() =>
                  handleClickButton(
                    QuestionData[questionNo].id,
                    QuestionData[questionNo].answere
                  )
                }
              >
                <div className="btn_inner">
                  <img
                    src="./img/main_btn_arrow.png"
                    alt=""
                    className="arrow"
                  />
                  <div className="img_wrap">
                    <img
                      src={QuestionData[questionNo].imagee}
                      alt=""
                      className="m_none"
                    />
                    <img
                      src={QuestionData[questionNo].mimagee}
                      alt=""
                      className="pc_none"
                    />
                  </div>
                  <p>“{QuestionData[questionNo].answere}”</p>
                </div>
              </button>
              <button
                className={`button_no${questionNo}`}
                onClick={() =>
                  handleClickButton(
                    QuestionData[questionNo].id,
                    QuestionData[questionNo].answerf
                  )
                }
              >
                <div className="btn_inner">
                  <img
                    src="./img/main_btn_arrow.png"
                    alt=""
                    className="arrow"
                  />
                  <div className="img_wrap">
                    <img
                      src={QuestionData[questionNo].imagef}
                      alt=""
                      className="m_none"
                    />
                    <img
                      src={QuestionData[questionNo].mimagef}
                      alt=""
                      className="pc_none"
                    />
                  </div>
                  <p>“{QuestionData[questionNo].answerf}”</p>
                </div>
              </button>
            </>
          )}

          {QuestionData[questionNo].answerg === undefined ? (
            ""
          ) : (
            <>
              <button
                className={`button_no${questionNo}`}
                onClick={() => {
                  handleClickButton(
                    QuestionData[questionNo].id,
                    QuestionData[questionNo].answerg
                  );
                }}
              >
                <div className="btn_inner">
                  <img
                    src="./img/main_btn_arrow.png"
                    alt=""
                    className="arrow"
                  />
                  <div className="img_wrap">
                    <img
                      src={QuestionData[questionNo].imageg}
                      alt=""
                      className="m_none"
                    />
                    <img
                      src={QuestionData[questionNo].mimageg}
                      alt=""
                      className="pc_none"
                    />
                  </div>
                  <p>“{QuestionData[questionNo].answerg}”</p>
                </div>
              </button>
              <button
                className={`button_no${questionNo}`}
                onClick={() =>
                  handleClickButton(
                    QuestionData[questionNo].id,
                    QuestionData[questionNo].answeri
                  )
                }
              >
                <div className="btn_inner">
                  <img
                    src="./img/main_btn_arrow.png"
                    alt=""
                    className="arrow"
                  />
                  <div className="img_wrap">
                    <img
                      src={QuestionData[questionNo].imagei}
                      alt=""
                      className="m_none"
                    />
                    <img
                      src={QuestionData[questionNo].mimagei}
                      alt=""
                      className="pc_none"
                    />
                  </div>
                  <p>“{QuestionData[questionNo].answeri}”</p>
                </div>
              </button>
            </>
          )}
        </div>
        <div className="question_dots">
          <Steps progressDot current={questionNo}>
            <Step />
            <Step />
            <Step />
            <Step />
            <Step />
            <Step />
            <Step />
            <Step />
          </Steps>
        </div>
      </div>
    </div>
  );
};

export default Question;
