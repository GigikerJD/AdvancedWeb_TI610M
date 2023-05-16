import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/editprofile.css";

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
        axios.get("http://localhost:8000/users").then((response) => {
          const dateString=response.data[0].Birthdate;
          const date=new Date(dateString);
          const formattedDate=date.toISOString().slice(0,10);
          setFormValues({...formValues,birthdate:formattedDate,Username:response.data[0].Username,Password:response.data[0].Password,address:response.data[0].Address,ID:response.data[0].ID,firstname:response.data[0].Firstname,lastname:response.data[0].Lastname,emailAddress:response.data[0].Mail,postcode:response.data[0].Postcode});
          console.log(response.data[0].Birthdate)
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
        axios.put(`http://localhost:8000/users/`, {
          Mail:user.emailAddress,Address:user.address,Postcode:user.postcode,ID:user.ID
      })
      };
    
      
    
      const handleCancel = () => {
        setEditableField('');
        setSelectedGametags(formValues.favoriteGametags);
      };

    return(
        <>
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
                  Mail Address:
                  <input type="text" name="emailAddress" value={formValues.emailAddress} onChange={handleChange} disabled={editableField !== 'emailAddress'} />
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