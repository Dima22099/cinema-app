import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const CustomCard = ({ onClick, title, Year, poster, buttonText }) => (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={poster} />
      <Card.Body>
        <Card.Title> {title}</Card.Title>
        <Card.Text>
         {Year}
        </Card.Text>
        <Button variant="primary" onClick={onClick}>{buttonText}</Button>
      </Card.Body>
    </Card>
);
