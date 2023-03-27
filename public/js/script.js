

function validateInput()
{
    const next = document.getElementById("next")
    if(next.value===null || next.value==="")
    {
        const div = document.createElement("div");
        div.classList.add("validation")
        console.log(div);
    }
}