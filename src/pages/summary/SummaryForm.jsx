import React from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export const SummaryForm = () => {
  const [disable, setDisable] = useState(false);

  const checkboxLabel = (
    <span>
      I agree with <span style={{ color: 'blue' }}>Terms and Conditions</span>
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
