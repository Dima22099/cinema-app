import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const CustomCard = ({ onClick, title, Year, poster, imdbID, textbtn }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={poster} />
      <Card.Body>
        <Card.Title> {title}</Card.Title>
        <Card.Text>
         {Year}
        </Card.Text>
        <Button variant="primary" onClick={onClick}>{textbtn}</Button>
      </Card.Body>
    </Card>
  );
};