const form = document.getElementById("transactionForm");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let transactionFormData = new FormData(form);
    let transactionObj = convertFormdataToTransactionObj(transactionFormData)
    saveTransactionObj(transactionObj)
    insertRowInTransactionTable(transactionObj)
    form.reset();
 }
)
    function Draw_category() {
    let allcategory =  [
        "Alquiler", "Trabajo", "Comida","Venta"
    ]
    for (let index = 0; index < allcategory.length; index++) {
        insertCategory(allcategory[index])
    }

}
    function insertCategory(categoryName) {
            const selectElement = document.getElementById("transactionCategory")
            let htmlToInsert =`<option>${categoryName}</option>`
            selectElement.insertAdjacentHTML('beforeend', htmlToInsert)
           
}

    document.addEventListener("DOMContentLoaded", function (event) {

    
    let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"))
    
     transactionObjArr.forEach(function (arrayElement) {
          
            insertRowInTransactionTable(arrayElement)

        }
    )       
    Draw_category() 
    }
    
)


    function getNewTransactionId() {
        let lastransactionId = localStorage.getItem("lastransactionId") || "-1"
        let newTransactionId =JSON.parse(lastransactionId) + 1;
        localStorage.setItem("lastransactionId", JSON.stringify(newTransactionId))
        return newTransactionId;
          
    } 
    function convertFormdataToTransactionObj (transactionFormData) {
          
       let tsSelector = transactionFormData.get("tsSelector");
       let transactionDescription = transactionFormData.get("TransactionDescription");
       let transactionAmount = transactionFormData.get("TransactionAmount");
       let transactionCategory = transactionFormData.get("TransactionCategory");
       let transactionId = getNewTransactionId();

       return {
           "tsSelector": tsSelector,
           "TransactionDescription": transactionDescription,
           "TransactionAmount": transactionAmount,
           "TransactionCategory": transactionCategory,
           "transactionId": transactionId


        }
    }


    function insertRowInTransactionTable(transactionObj) {
        let transactionTablesRef = document.getElementById("transactionTable");
        let newTransactionRowRef = transactionTablesRef.insertRow(-1);
        newTransactionRowRef.setAttribute("data-transaction-id", transactionObj["transactionId"]);
        //newTransactionRowRef.setAttribute("Code",1)
        let newTypeCellRef = newTransactionRowRef.insertCell(0); 
        newTypeCellRef.textContent = transactionObj["tsSelector"];

        newTypeCellRef = newTransactionRowRef.insertCell(1);
        newTypeCellRef.textContent = transactionObj["TransactionDescription"];

        newTypeCellRef = newTransactionRowRef.insertCell(2);
        newTypeCellRef.textContent = transactionObj["TransactionAmount"];

        newTypeCellRef = newTransactionRowRef.insertCell(3);
        newTypeCellRef.textContent = transactionObj["TransactionCategory"];

        let newdeleteCell = newTransactionRowRef.insertCell(4);
        let deleteButton = document.createElement("button");
        deleteButton.textContent="Eliminar"
        newdeleteCell.appendChild(deleteButton)

        deleteButton.addEventListener("click", (event) => {
            let transactionRow =  event.target.parentNode.parentNode;
            let transactionId = transactionRow.getAttribute("data-transaction-id");
            transactionRow.remove();
            deleteTransactionObj(transactionId);
            //event.target.parentNode.parentNode.remove()


        }
    ) 


    }
    // Paso parametro transactionID y eliminarlo
    function deleteTransactionObj(transactionId) {
        // obtengo base del localstorage
        let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"));
        // busca indice
        let transactionIndexArr = transactionObjArr.findIndex((element => element.transactionId == transactionId));
        transactionObjArr.splice(transactionIndexArr, 1);
        let transactionArrayJSON = JSON.stringify(transactionObjArr);
        localStorage.setItem("transactionData", transactionArrayJSON);
      

    } 
    function saveTransactionObj(transactionObj) {
        let mytransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
        mytransactionArray.push(transactionObj);
        let transactionArrayJSON = JSON.stringify(mytransactionArray);
        localStorage.setItem("transactionData", transactionArrayJSON);
    }
 