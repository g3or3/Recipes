import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const StyledLandingPage = styled.div`
	.container {
		background-image: url("https://www.telegraph.co.uk/content/dam/food-and-drink/2017/03/23/recipes-written-out_trans_NvBQzQNjv4Bqeo_i_u9APj8RuoebjoAHt0k9u7HhRJvuo-ZLenGRumA.jpg");
		background-size: cover;
		background-position: center;
		border: 35px solid #7c9082;
		height: 1000px;
		margin: 5%;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-shadow: 0px 0px 25px 15px rgb(0, 0, 0, 0.5);
	}

	h1 {
		color: #8b687f;
		text-shadow: 0px 0px 5px rgba(255, 255, 255, 0.3);
		background-color: rgba(0, 0, 0, 0.7);
		border-radius: 12px;
		width: fit-content;
		font-size: 4rem;
		text-align: center;
		margin: 10% 0 5% 0;
		padding: 2%;
	}

	.buttons {
		display: flex;
		/* flex-direction: column; */
		justify-content: center;
		margin-top: 3%;
	}

	button {
		margin: 7% 3%;
		font-size: 2.4rem;
		padding: 1% 3%;
		width: 300px;
		border: none;
		border-radius: 12px;
		color: #2e2e2e;
		background-color: #73b0cc;
		cursor: pointer;
		box-shadow: 0px 0px 10px rgb(0, 0, 0, 0.2);
		&:active {
			background-color: #558da7;
		}
		&:hover {
			box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.7);
		}
	}

	p {
		color: white;
		text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7);
		font-style: italic;
		font-size: 2.2rem;
		text-align: center;
		line-height: 1.2;
		width: 50%;
		margin: 5%;
	}
`;

function LandingPage() {
	const { push } = useHistory();

	return (
		<StyledLandingPage>
			<div className="container">
				<h1>Secret Recipe's Page</h1>
				<div className="buttons">
					<button onClick={() => push("/login")} className="login-btn">
						Log In
					</button>
					<button onClick={() => push("/register")} className="reg-btn">
						Registration
					</button>
				</div>
				<p>
					This page is dedicated to all of our "secret recipes". Please feel free to add
					one you are especially fond of!
				</p>
			</div>
		</StyledLandingPage>
	);
}

export default LandingPage;
