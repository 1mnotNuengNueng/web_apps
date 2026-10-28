Import

const FoodForm = () => {
    const [inputs, setInputs] = useState({ name: "", price: "", isBestSeller: 'true' });
    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }
    function handleSubmit(e) {
        e.preventDefault();
        const newFood = {



        };
        setInputs({ name: "", price: "", isBestSeller: 'true' });

    }
    return (<form onSubmit={handleSubmit}>

        <input type="text" name="name" value={inputs.name} onChange={handleChange} />


        <input type="number" name="price" value={inputs.price} onChange={handleChange} />


        <select name="isBestSeller" onChange={handleChange}>
            <option value="true">BestSeller</option>
            <option value="false">Normal</option>
        </select>


        <button>Add menu</button>
    </form>);
}
export default userForm;

