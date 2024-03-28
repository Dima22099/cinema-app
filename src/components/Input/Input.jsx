import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export const Input = ({ onChange, value, placeholder  }) => {
    return (    
        <InputGroup>
            <Form.Control
                autoFocus
                value={value} 
                onChange={onChange} 
                placeholder={placeholder}
            />
        </InputGroup>
    )
};
