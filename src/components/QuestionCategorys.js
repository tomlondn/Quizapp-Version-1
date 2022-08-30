import React from "react";
import QuestionCategory from "./QuestionCategory";

const QuestionCategorys = ({ setCategorie, categories }) => {
    return (
        <section>
            <header>
                <h2>Kategorie-Wählen:</h2>
            </header>
            <article className="categories">
                <ul className="quizCategorie">
                    {categories.map((item, index) => {
                        return (
                            <QuestionCategory
                                key={index}
                                index={index}
                                active = {item.active}
                                categorie={item.categorie}
                                quizCat={setCategorie}
                            ></QuestionCategory>
                        )
                    })}
                </ul>
            </article>
        </section>
    );
};
export default QuestionCategorys;
