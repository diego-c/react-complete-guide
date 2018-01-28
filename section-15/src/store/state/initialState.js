import axios from '../../axios-order';

const fetchIngredients = async () => {
    let ingredients; 
    
    try {
        ingredients = await axios.get('/ingredients.json')
        return ingredients;

    } catch(error) {
        console.error(`Oops, could not fetch ingredients! ${error}`);
    }
}

export default fetchIngredients;