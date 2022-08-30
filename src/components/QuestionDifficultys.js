import React from "react";
import QuestionDifficulty from "./QuestionDifficulty";

const QuestionDifficultys = ({difficultys, setDifficulty}) => {
    
    return (
        <section>
            <header>
                <h2>Schwierigkeit-Wählen:</h2>
            </header>
            <article className="difficultys">
                <ul className="quizDifficulty">
                    {difficultys.map((item, index) => {
                        return (
                            <QuestionDifficulty
                                key={index}
                                index={index}
                                difficulty={item.difficulty}
                                active= {item.active}
                                quizDifficulty={setDifficulty}
                            ></QuestionDifficulty>
                        )
                    })}
                </ul>
            </article>
        </section>
    );
};
export default QuestionDifficultys;