import React from 'react'
import { Button, Col, Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function SearchBar() {

    return (
        <Form>
            <FormGroup>
                <InputGroup>
                    <FormControl />
                    <Button type='submit'>
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>
                </InputGroup>
            </FormGroup>
        </Form>
    );

}