import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export const Input = ({ placeholder, onChange, value,  }) => {
    return (    
        <InputGroup>
            <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={value} 
            onChange={onChange} 
            placeholder='search films'
            autoFocus
            />
        </InputGroup>
    )
};
