"use client";

import { cn } from "@/lib/utils";

interface EditorProps {
    activeTab: string;
}

const lineNumbersMain = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
];

const kw = "text-emerald-400";
const ty = "text-sky-400";
const id = "text-zinc-300";
const st = "text-amber-400";
const nu = "text-fuchsia-400";
const op = "text-slate-500";
const co = "text-slate-500 italic";
const fn = "text-amber-300";
const mu = "text-violet-400";

function MainFsCode() {
    return (
        <pre className="font-mono text-[13px] leading-6">
            <code>
                <div>
                    <span className={co}>// main.fs — FlowScript entry point</span>
                </div>
                <div>
                    <span className={mu}>mod</span>{" "}
                    <span className={id}>utils</span>
                    <span className={op}>;</span>
                </div>
                <div>
                    <span className={mu}>use</span>{" "}
                    <span className={id}>std</span>
                    <span className={op}>::</span>
                    <span className={id}>io</span>
                    <span className={op}>::</span>
                    <span className={fn}>println</span>
                    <span className={op}>;</span>
                </div>
                <div>
                    <span className={mu}>use</span>{" "}
                    <span className={id}>std</span>
                    <span className={op}>::</span>
                    <span className={id}>sync</span>
                    <span className={op}>::</span>
                    <span className={ty}>Arc</span>
                    <span className={op}>;</span>
                </div>
                <div>&nbsp;</div>
                <div>
                    <span className={kw}>struct</span>{" "}
                    <span className={ty}>Config</span>{" "}
                    <span className={op}>{"{"}</span>
                </div>
                <div>
                    &nbsp;&nbsp;<span className={id}>name</span>
                    <span className={op}>:</span>{" "}
                    <span className={ty}>String</span>
                    <span className={op}>,</span>
                </div>
                <div>
                    &nbsp;&nbsp;<span className={id}>verbose</span>
                    <span className={op}>:</span>{" "}
                    <span className={ty}>bool</span>
                    <span className={op}>,</span>
                </div>
                <div>
                    &nbsp;&nbsp;<span className={id}>count</span>
                    <span className={op}>:</span>{" "}
                    <span className={ty}>i32</span>
                    <span className={op}>,</span>
                </div>
                <div>
                    <span className={op}>{"}"}</span>
                </div>
                <div>&nbsp;</div>
                <div>
                    <span className={kw}>fn</span>{" "}
                    <span className={fn}>add</span>
                    <span className={op}>(</span>
                    <span className={id}>a</span>
                    <span className={op}>:</span>{" "}
                    <span className={ty}>i32</span>
                    <span className={op}>,</span>{" "}
                    <span className={id}>b</span>
                    <span className={op}>:</span>{" "}
                    <span className={ty}>i32</span>
                    <span className={op}>)</span>{" "}
                    <span className={op}>-&gt;</span>{" "}
                    <span className={ty}>i32</span>{" "}
                    <span className={op}>{"{"}</span>
                </div>
                <div>
                    &nbsp;&nbsp;<span className={id}>a</span>{" "}
                    <span className={op}>+</span>{" "}
                    <span className={id}>b</span>
                </div>
                <div>
                    <span className={op}>{"}"}</span>
                </div>
                <div>&nbsp;</div>
                <div>
                    <span className={kw}>fn</span>{" "}
                    <span className={fn}>main</span>
                    <span className={op}>()</span>{" "}
                    <span className={op}>-&gt;</span>{" "}
                    <span className={ty}>Result</span>
                    <span className={op}>&lt;</span>
                    <span className={op}>&gt;</span>{" "}
                    <span className={op}>{"{"}</span>
                </div>
                <div>
                    &nbsp;&nbsp;<span className={kw}>let</span>{" "}
                    <span className={id}>x</span>
                    <span className={op}>:</span>{" "}
                    <span className={ty}>i32</span>{" "}
                    <span className={op}>=</span>{" "}
                    <span className={nu}>1</span>
                    <span className={op}>;</span>
                </div>
                <div>
                    &nbsp;&nbsp;<span className={kw}>let</span>{" "}
                    <span className={id}>y</span>
                    <span className={op}>:</span>{" "}
                    <span className={ty}>i32</span>{" "}
                    <span className={op}>=</span>{" "}
                    <span className={nu}>2</span>
                    <span className={op}>;</span>
                </div>
                <div>
                    &nbsp;&nbsp;<span className={kw}>let</span>{" "}
                    <span className={id}>msg</span>{" "}
                    <span className={op}>=</span>{" "}
                    <span className={st}>"Hello, FlowScript!"</span>
                    <span className={op}>;</span>
                </div>
                <div>
                    &nbsp;&nbsp;<span className={fn}>println</span>
                    <span className={op}>(</span>
                    <span className={st}>"{} 1+2={}"</span>
                    <span className={op}>,</span>{" "}
                    <span className={id}>msg</span>
                    <span className={op}>,</span>{" "}
                    <span className={fn}>add</span>
                    <span className={op}>(</span>
                    <span className={id}>x</span>
                    <span className={op}>,</span>{" "}
                    <span className={id}>y</span>
                    <span className={op}>));</span>
                </div>
                <div>
                    &nbsp;&nbsp;<span className={kw}>match</span>{" "}
                    <span className={id}>x</span>{" "}
                    <span className={op}>{"{"}</span>
                </div>
                <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className={nu}>1</span>{" "}
                    <span className={op}>=&gt;</span>{" "}
                    <span className={fn}>println</span>
                    <span className={op}>(</span>
                    <span className={st}>"one"</span>
                    <span className={op}>),</span>
                </div>
                <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className={nu}>2</span>{" "}
                    <span className={op}>=&gt;</span>{" "}
                    <span className={fn}>println</span>
                    <span className={op}>(</span>
                    <span className={st}>"two"</span>
                    <span className={op}>),</span>
                </div>
                <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className={id}>_</span>{" "}
                    <span className={op}>=&gt;</span>{" "}
                    <span className={fn}>println</span>
                    <span className={op}>(</span>
                    <span className={st}>"other"</span>
                    <span className={op}>),</span>
                </div>
                <div>
                    &nbsp;&nbsp;<span className={op}>{"}"}</span>
                </div>
                <div>
                    &nbsp;&nbsp;<span className={kw}>Ok</span>
                    <span className={op}>(())</span>
                </div>
                <div>
                    <span className={op}>{"}"}</span>
                </div>
            </code>
        </pre>
    );
}

function LibFsCode() {
    return (
        <pre className="font-mono text-[13px] leading-6">
            <code>
                <div>
                    <span className={co}>// lib.fs — shared utilities</span>
                </div>
                <div>
                    <span className={kw}>pub</span>{" "}
                    <span className={kw}>fn</span>{" "}
                    <span className={fn}>greet</span>
                    <span className="op">(</span>
                    <span className={id}>name</span>
                    <span className={op}>:</span>{" "}
                    <span className={op}>&amp;</span>
                    <span className={ty}>str</span>
                    <span className={op}>)</span>{" "}
                    <span className={op}>-&gt;</span>{" "}
                    <span className={ty}>String</span>{" "}
                    <span className={op}>{"{"}</span>
                </div>
                <div>
                    &nbsp;&nbsp;<span className={kw}>format</span>
                    <span className={op}>!</span>
                    <span className={op}>(</span>
                    <span className={st}>"Hello, {}"</span>
                    <span className={op}>,</span>{" "}
                    <span className={id}>name</span>
                    <span className={op}>)</span>
                </div>
                <div>
                    <span className={op}>{"}"}</span>
                </div>
                <div>&nbsp;</div>
                <div>
                    <span className={co}>/// A generic memoized wrapper</span>
                </div>
                <div>
                    <span className={kw}>pub</span>{" "}
                    <span className={kw}>struct</span>{" "}
                    <span className={ty}>Memo</span>
                    <span className={op}>&lt;</span>
                    <span className={id}>T</span>
                    <span className={op}>&gt;</span>{" "}
                    <span className={op}>{"{"}</span>
                </div>
                <div>
                    &nbsp;&nbsp;<span className={id}>inner</span>
                    <span className={op}>:</span>{" "}
                    <span className={ty}>Option</span>
                    <span className={op}>&lt;</span>
                    <span className={id}>T</span>
                    <span className={op}>&gt;,</span>
                </div>
                <div>
                    <span className={op}>{"}"}</span>
                </div>
            </code>
        </pre>
    );
}

function ConfigTomlCode() {
    return (
        <pre className="font-mono text-[13px] leading-6">
            <code>
                <div>
                    <span className={co}># Flow.toml — package manifest</span>
                </div>
                <div>
                    <span className={op}>[</span>
                    <span className={mu}>package</span>
                    <span className={op}>]</span>
                </div>
                <div>
                    <span className={id}>name</span>
                    <span className={op}> = </span>
                    <span className={st}>"hello-flow"</span>
                </div>
                <div>
                    <span className={id}>version</span>
                    <span className={op}> = </span>
                    <span className={st}>"0.1.0"</span>
                </div>
                <div>
                    <span className={id}>edition</span>
                    <span className={op}> = </span>
                    <span className={st}>"2025"</span>
                </div>
                <div>
                    <span className={id}>authors</span>
                    <span className={op}> = </span>
                    <span className={op}>[</span>
                    <span className={st}>"AO Team"</span>
                    <span className={op}>]</span>
                </div>
                <div>&nbsp;</div>
                <div>
                    <span className={op}>[</span>
                    <span className={mu}>dependencies</span>
                    <span className={op}>]</span>
                </div>
                <div>
                    <span className={id}>serde</span>
                    <span className={op}> = </span>
                    <span className={st}>"1.0"</span>
                </div>
                <div>
                    <span className={id}>tokio</span>
                    <span className={op}> = </span>
                    <span className={op}>{"{ "}</span>
                    <span className={id}>version</span>
                    <span className={op}> = </span>
                    <span className={st}>"1.0"</span>
                    <span className={op}>, </span>
                    <span className={id}>features</span>
                    <span className={op}> = </span>
                    <span className={op}>{"["}</span>
                    <span className={st}>"full"</span>
                    <span className={op}>{"], }"}</span>
                </div>
            </code>
        </pre>
    );
}

export default function Editor({ activeTab }: EditorProps) {
    const code =
        activeTab === "main.fs" ? (
            <MainFsCode />
        ) : activeTab === "lib.fs" ? (
            <LibFsCode />
        ) : (
            <ConfigTomlCode />
        );

    const numbers =
        activeTab === "main.fs"
            ? lineNumbersMain
            : activeTab === "lib.fs"
              ? lineNumbersMain.slice(0, 11)
              : lineNumbersMain.slice(0, 14);

    return (
        <div className="relative flex min-h-0 flex-1 overflow-hidden bg-[#0f172a]">
            <div className="flex shrink-0 select-none flex-col border-r border-[#1e293b] bg-[#0b1020] px-3 py-4 font-mono text-[12px] leading-6 text-[#475569]">
                {numbers.map((n) => (
                    <div key={n} className="text-right tabular-nums">
                        {n}
                    </div>
                ))}
            </div>

            <div className="relative flex-1 overflow-auto py-4 pl-4 pr-6">
                {code}

                <span
                    aria-hidden
                    className={cn(
                        "pointer-events-none absolute left-[92px] top-[282px] h-5 w-2 translate-y-[2px] rounded-sm bg-emerald-400/80 animate-pulse",
                    )}
                />
            </div>
        </div>
    );
}
