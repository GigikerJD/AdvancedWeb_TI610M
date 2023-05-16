import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/editprofile.css";
import NavGames from "./NavGames"



const Contact = () => {
  
    const [formValues, setFormValues] = useState({ID:'',Username:'',Password:'', firstname: '', lastname: '', birthdate: '',emailAddress: '',address:'',postcode:'',favoriteGametags: [] });
    const [editableField, setEditableField] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [selectedGametags, setSelectedGametags] = useState([]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        if(name === 'favouriteGametags'){
            if(selectedGametags.includes(value)){
                setSelectedGametags(selectedGametags.filter(tag => tag !== value ));
            }else{
                if(selectedGametags.length < 3){
                    setSelectedGametags([...selectedGametags, value]);
                }
            }
        }else{
            setFormValues(prevValues => ({ ...prevValues, [name]: value}));
        }
    }

    useEffect(() => {
        axios.get("http://localhost:8000/accounts").then((response) => {
          const dateString=response.data[0].birthdate;
          console.log(dateString);
          const date=new Date(dateString);
          const formattedDate=date.toISOString().slice(0,10);
          setFormValues({...formValues,birthdate:formattedDate,Username:response.data[0].username,Password:response.data[0].password,address:response.data[0].Address,firstname:response.data[0].firstname,lastname:response.data[0].lastname,emailAddress:response.data[0].email,postcode:response.data[0].postcode});
          console.log(formattedDate)
        });
    }, []);

    console.log(formValues)
    const handleEdit = (fieldName) => {
        setEditableField(fieldName);
        setIsEditing(true);
    };

    const handleSubmit = event => {
        event.preventDefault();
        const user = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        birthDate: formValues.birthDate,
        password: formValues.password,
        emailAddress: formValues.emailAddress,
        address: formValues.address,
        city: formValues.city,
        postcode: formValues.postcode,
        favoriteGametags: selectedGametags,
        ID:formValues.ID
        };
        console.log(user);
        setEditableField('');
        console.log(user.ID)
        console.log(user.postcode)
        axios.put("http://localhost:8000/accounts", {
          Mail:user.emailAddress,city:user.city,Postcode:user.postcode,Password:user.password
      })
      };
    
      
    
      const handleCancel = () => {
        setEditableField('');
        setSelectedGametags(formValues.favoriteGametags);
      };

    return(
       
        <>
         <NavGames/>
            <form id="edit-form "onSubmit={handleSubmit}>
                <label>
                  First name:
                  <input type="text" name="firstname" value={formValues.firstname} onChange={handleChange} disabled={editableField !== 'firstname'} />
                </label>
                <br />
                <label>
                  Last name:
                  <input type="text" name="lastname" value={formValues.lastname} onChange={handleChange} disabled={editableField !== 'lastname'} />
                </label>
                <br />
                <label>
                  Birthdate:
                  <input type="date" name="birthdate" value={formValues.birthdate} onChange={handleChange} disabled={editableField !== 'birthdate'} />
                </label>
                <br />
                <label>
                  Password:
                  <input type="password" name="Password" value={formValues.Password} onChange={handleChange} disabled={editableField !== 'Password'} />
                  {editableField !== 'Password' && <button className="edit-button" onClick={() => handleEdit('Password')}>Edit</button>}
                </label>
                <br />
                <label>
                  Mail Address:
                  <input type="email" name="emailAddress" value={formValues.emailAddress} onChange={handleChange} disabled={editableField !== 'emailAddress'} />
                  {editableField !== 'emailAddress' && <button className="edit-button" onClick={() => handleEdit('emailAddress')}>Edit</button>}
                </label>
                <br />
                <label>
                  Address:
                  <input type="text" name="address" value={formValues.address} onChange={handleChange} disabled={editableField !== 'address'} />
                  {editableField !== 'address' && <button className="edit-button" onClick={() => handleEdit('address')}>Edit</button>}
                </label>
                <br />
                <label>
                  Postcode:
                  <input type="text" name="postcode" value={formValues.postcode} onChange={handleChange} disabled={editableField !== 'postcode'} />
                  {editableField !== 'postcode' && <button className="edit-button" onClick={() => handleEdit('postcode')}>Edit</button>}
                </label>
                <br />
                <label> 
                Favourite Gametags:
                {editableField === 'favoriteGametags' ? (
                  <span>
                    <br />
                    <input type="checkbox" name="favoriteGametags" value="Action" checked={selectedGametags.includes('Action')} onChange={handleChange} disabled={selectedGametags.length >= 3 && !selectedGametags.includes('Action')} />
                    <span>Action</span>
                    <br />
                    <input type="checkbox" name="favoriteGametags" value="Adventure" checked={selectedGametags.includes('Adventure')} onChange={handleChange} disabled={selectedGametags.length >= 3 && !selectedGametags.includes('Adventure')} />
                    <span>Adventure</span>
                    <br />
                    <input type="checkbox" name="favoriteGametags" value="Sports" checked={selectedGametags.includes('Sports')} onChange={handleChange} disabled={selectedGametags.length >= 3 && !selectedGametags.includes('Sports')} />
                    <span>Sports</span>
                    <br />
                    <input type="checkbox" name="favoriteGametags" value="Strategy" checked={selectedGametags.includes('Strategy')} onChange={handleChange} disabled={selectedGametags.length >= 3 && !selectedGametags.includes('Strategy')} />
                    <span>Strategy</span>
                    <br />
                    <input type="checkbox" name="favoriteGametags" value="Racing" checked={selectedGametags.includes('Racing')} onChange={handleChange} disabled={selectedGametags.length >= 3 && !selectedGametags.includes('Racing')} />
                    <span>Racing</span>
                    <br />
                  </span>
                ) : (
                  <span>
                    {selectedGametags.map((key,index)=>
                  <span key={index}>
                    {key+ " "}
                  </span>
                )}
    
                <button className="edit-button" onClick={() => handleEdit('favoriteGametags')}>Edit</button>
                </span>
                )}
            </label>

            {editableField !== '' && (
              <div className="button-container">
                <button type="submit">Submit</button>
                <button className="cancel-button" onClick={handleCancel}>Cancel</button>
              </div>
            )}
            </form>
        </>
    )
}

export default Contact;