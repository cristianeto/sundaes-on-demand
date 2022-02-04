import React from 'react';
import { useState } from 'react';
import { Button, Form, Popover, OverlayTrigger } from 'react-bootstrap';

// const popover = (
//   <Popover id='popover-basic'>
//     <Popover.Header as='h3'>Popover right</Popover.Header>
//     <Popover.Body>
//       And here's some <strong>amazing</strong> content. It's very engaging.
//       right?
//     </Popover.Body>
//   </Popover>
// );

// const Example = () => (
//   <OverlayTrigger trigger='click' placement='right' overlay={popover}>
//     <Button variant='success'>Click me to see</Button>
//   </OverlayTrigger>
// );

export const SummaryForm = () => {
  const [disable, setDisable] = useState(false);

  const popover = (
    <Popover id='popover-basic'>
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree with
      <OverlayTrigger placement='right' overlay={popover}>
        <span style={{ color: 'blue' }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId='terms-and-conditions'>
        <Form.Check
          type='checkbox'
          checked={disable}
          onChange={(e) => setDisable(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant='primary' type='submit' disabled={!disable}>
        Confirm order
      </Button>
    </Form>
  );
};
