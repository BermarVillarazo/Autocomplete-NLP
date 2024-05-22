"use client";

import { ReactNode, useEffect, useState } from "react";

export default function Form() {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [firstSuggestion, setFirstSuggestion] = useState("");

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                `http://localhost:8080/autocomplete?q=${encodeURIComponent(input)}`
            );
            const data = await response.json();
            setSuggestions(data.Completions);
            setFirstSuggestion(data.Completions[0]);
        }

        if (input.length > 0) {
            fetchData();
        }
    }, [input]);

    console.log(firstSuggestion);

    return (
        <form className="w-full">
            <textarea
                placeholder={`${
                    input.length === 0
                        ? "Try daw suwat amaw. I can predict your typings..."
                        : firstSuggestion
                }`}
                rows={3}
                className="textarea textarea-error w-full text-xl p-5"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            ></textarea>
            <div className="flex justify-around py-5 gap-5">
                <div className="flex flex-col">
                    <Span title="First suggestion based on the Sample.json file:">
                        {`${
                            input.length === 0
                                ? "Try to type something..."
                                : firstSuggestion || "No word suggested found."
                        }`}
                    </Span>
                </div>

                <div className="flex flex-col">
                    <Span title="All suggestion based on the Sample.json file:">
                        {suggestions.map((suggestion, index) => (
                            <p key={index} className="mt-5">
                                {input.length === 0 ? "" : suggestion}
                            </p>
                        ))}
                    </Span>
                </div>
            </div>
        </form>
    );
}

function Span({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="card w-full glass min-h-72">
            <div className="card-body">
                <i className="font-bold text-2xl">{title}</i>
                <p className="flex justify-around flex-col text-xl">{children}</p>
            </div>
        </div>
    );
}
