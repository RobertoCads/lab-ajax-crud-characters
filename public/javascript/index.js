const charactersAPI = new APIHandler('https://minions-api.herokuapp.com/characters');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI
      .getFullList()
      .then(response => {
        let text = ""
        response.data.forEach(eachCharacter =>
          text += `<li>Id: ${eachCharacter.id}</li> <li>Name: ${eachCharacter.name}</li> <li>Occupation: ${eachCharacter.occupation}</li> <li>Is a cartoon?: ${eachCharacter.cartoon}</li> <li>Weapon: ${eachCharacter.weapon}</li> <br>`)
        document.querySelector(".character-info").innerHTML = text
      })
      .catch(err => console.log(err))

  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    const id = document.querySelector(".operation input").value

    charactersAPI
      .getOneRegister(id)
      .then(response => {
        text = ""
        text += `<li>Id: ${response.data.id}</li>  <li>Name: ${response.data.name}</li> <li>Occupation: ${response.data.occupation}</li> <li>Is a Cartoon?: ${response.data.cartoon}</li> <li>Weapon: ${response.data.weapon}</li>`
        document.querySelector(".character-info").innerHTML = text
      })
      .catch(err => console.log(err))
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    const id = document.querySelector(".delete input").value

    charactersAPI
        .deleteOneRegister(id)
        .then(response => {
          if (response.data === null) {
            document.querySelector("#delete-one").style.background = "red"
          } else {
            document.querySelector("#delete-one").style.background = "green"
          }
          
        })
      .catch(err => console.log(err))
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault()

    const inputs = document.querySelectorAll("#edit-character-form input")

    const characterData = {
      id: inputs[0].value,
      name: inputs[1].value,
      occupation: inputs[2].value,
      weapon: inputs[3].value,
      cartoon: inputs[4].checked
    }

    charactersAPI
        .updateOneRegister(characterData.id, characterData)
        .then(response => {
          document.querySelectorAll("#edit-character-form input")
          document.querySelector("#edit-character-form").reset()
          if (response.data === null) {
            document.querySelector(".edit-button").style.background = "red"
          } else {
            document.querySelector(".edit-button").style.background = "green"
          }  
        })
        .catch(err => {
          console.log(err)
          document.querySelector(".edit-button").style.background = "red"
        })
          

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {

    event.preventDefault()

    const inputs = document.querySelectorAll("#new-character-form input")
    console.log(inputs)

    const characterData = {
      name: inputs[0].value,
      occupation: inputs[1].value,
      weapon: inputs[2].value,
      cartoon: inputs[3].checked
    }

    charactersAPI
        .createOneRegister(characterData)
        .then(response => {
          document.querySelectorAll("#new-character-form input")
          document.querySelector("#new-character-form").reset()
          if (response.data === null) {
            document.querySelector(".edit-button").style.background = "red"
          } else {
            document.querySelector("#send-data").style.background = "green"
          }
          
        })
        .catch(err => {
          console.log(err)
          document.querySelector("#send-data").style.background = "red"
        })
          
  });
});
