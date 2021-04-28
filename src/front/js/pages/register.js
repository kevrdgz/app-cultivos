import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Button, InputGroup, Card, Container, Row, Col, Form, ButtonGroup } from "react-bootstrap";
import { Link, useParams, Redirect } from "react-router-dom";
import "../../styles/register.scss";

export const Register = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [auth, setAuth] = useState(false);
	const [msg, setMsg] = useState("");

	const handleSummit = e => {
		e.preventDefault();
		let response = {
			email: email,
			password: password,
			lastName: lastName,
			firstName: firstName
		};

		fetch(process.env.BACKEND_URL + "/api/user/register", {
			method: "POST",
			body: JSON.stringify(response),
			headers: { "Content-Type": "application/json" }
		})
			.then(
				res => res.json()

				// if (res.status == 400) {
				// 	setMsg(res.json().msg);
				// 	throw res.json().msg;
				// }
				// setMsg("");
				// console.log(res);
			)
			.then(data => {
				if (data.status === "succesful") {
					console.log(data);
					setAuth(true);
					setMsg(data.msg);
				} else {
					setMsg(data.msg);
				}
			})
			.catch(error => console.log(error));
	};

	return (
		<Container className="p-5 mt-5">
			<Row className="justify-content-center">
				<Col sm={10} md={10}>
					<Card className="shadow border-0 p-3">
						<Col sm={12} lg={6}>
							<div>
								<h4 className="display-4">¡Bienvenido!</h4>
								<h5 className="font-weight-normal">Cree su cuenta</h5>
							</div>

							<h3 className="display-5">Registro</h3>
							{msg ? (
								<div className="alert alert-danger" role="alert">
									{msg}
								</div>
							) : null}
							<Form onSubmit={() => handleSummit(event)}>
								<Form.Row>
									<Col lg={12}>
										<Form.Group controlId="formGroupEmail">
											<InputGroup className="mb-2 mr-sm-2">
												<InputGroup.Prepend>
													<InputGroup.Text>
														<i className="fas fa-user" />
													</InputGroup.Text>
												</InputGroup.Prepend>
												<Form.Control
													type="text"
													placeholder="primer nombre"
													onChange={event => setFirstName(event.target.value)}
													value={firstName}
													required
												/>
											</InputGroup>
										</Form.Group>
									</Col>
								</Form.Row>

								<Form.Row>
									<Col lg={12}>
										<Form.Group controlId="formGroupEmail">
											<InputGroup className="mb-2 mr-sm-2">
												<InputGroup.Prepend>
													<InputGroup.Text>
														<i className="fas fa-user" />
													</InputGroup.Text>
												</InputGroup.Prepend>
												<Form.Control
													type="text"
													placeholder="primer apellido"
													onChange={event => setLastName(event.target.value)}
													value={lastName}
													required
												/>
											</InputGroup>
										</Form.Group>
									</Col>
								</Form.Row>

								<Form.Row>
									<Col lg={12}>
										<Form.Group controlId="formGroupEmail">
											<InputGroup className="mb-2 mr-sm-2">
												<InputGroup.Prepend>
													<InputGroup.Text>
														<i className="fas fa-at" />
													</InputGroup.Text>
												</InputGroup.Prepend>
												<Form.Control
													type="email"
													placeholder="correo electrónico"
													onChange={event => setEmail(event.target.value)}
													value={email}
													required
												/>
											</InputGroup>
										</Form.Group>
									</Col>
								</Form.Row>

								<Form.Row>
									<Col lg={12}>
										<Form.Group controlId="formGroupPassword">
											<InputGroup className="mb-2 mr-sm-2">
												<InputGroup.Prepend>
													<InputGroup.Text>
														<i className="fas fa-lock" />
													</InputGroup.Text>
												</InputGroup.Prepend>
												<Form.Control
													type="password"
													placeholder="contraseña"
													onChange={event => setPassword(event.target.value)}
													value={password}
													required
												/>
											</InputGroup>
										</Form.Group>
									</Col>
								</Form.Row>

								<Form.Row>
									<Col lg={10}>
										<Button variant="primary" type="submit" className="btn btn-dark">
											Crear
										</Button>{" "}
										<Link to="/" role="button" className="ml-1 btn btn-light" variant="light">
											Cancelar
										</Link>
									</Col>
								</Form.Row>
							</Form>
							{auth ? <Redirect to="/login" /> : null}
						</Col>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};
