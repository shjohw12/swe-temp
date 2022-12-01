import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";

import Editor from "@monaco-editor/react";
import axios from "axios";

import CodeDiff from "react-code-diff-lite";


function MyEditor() {
    const editorRef = useRef(null);
    const defaultCode = "def solution(num1, num2) {\n    \n}";

    const [userCode, setUserCode] = useState("");
    const [correctCode, setCorrectCode] = useState("");

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    function showValue() {
        axios.post(
            'http://146.56.165.145:8000/api/testcase/test/',
            {
                "user_id": 1,
                "problem_id": 1,
                "user_code": editorRef.current.getValue(),
            }
        ).then(function (res) {
            console.log(res.data);
        }).catch(function (error) {

        }
        )
    }

    function copyCode() {
        window.navigator.clipboard.writeText(editorRef.current.getValue()).then(() => {
            alert("복사 완료!");
        });
    }

    function importData() {
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = _ => {
            // you can use this method to get file and perform respective operations
            let files = Array.from(input.files);
            let reader = new FileReader();
            reader.readAsText(files[0]);
            reader.onload = function () {
                editorRef.current.getModel().setValue(reader.result);
            }
        };
        input.click();

    }

    function codeInit() {
        editorRef.current.getModel().setValue(defaultCode);
    }


    function showCodeDiff() {
        setUserCode(editorRef.current.getValue());
    }


    return (
        <>
            <button onClick={codeInit}>초기화</button>
            <button>저장</button>
            <button>불러오기</button>
            <button>실행</button>
            <button>채점</button>
            <button onClick={copyCode}>복사</button>
            <button onClick={importData}>파일 업로드</button>
            <button onClick={showCodeDiff}>codediff</button>
            <button onClick={showValue}>제출</button>

            <button >1</button>
            <button >2</button>
            <button >3</button>

            <CodeDiff oldStr={userCode} newStr={correctCode} context={10} />

            <Editor
                height="90vh"
                defaultLanguage="python"
                defaultValue={defaultCode}
                onMount={handleEditorDidMount}
            />

        </>
    );
}

export default MyEditor;