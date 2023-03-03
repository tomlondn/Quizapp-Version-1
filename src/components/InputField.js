import React from 'react'

const InputField = ({ inputLabel, placeholder , action, buttonLabel, button, input }) => {

    return (
        <section className="formWrapper">

            <form>
                {input === true ?
                    (
                        <div>
                            <label>
                                {inputLabel}
                            </label>
                            <input placeholder={placeholder} id="countryInput" onKeyPress={action} type="text"></input>
                        </div>
                    ) : ""
                }
                {button === true ?
                    (
                    <div>
                        <button onClick={action}>{buttonLabel}</button>
                    </div>
                    ) : ""
                }
            </form>
        </section>

    )
}
export default InputField;