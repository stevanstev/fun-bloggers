const errorField = (props) => {
	return (
		<p style={style}>
			{props.message}
		</p>
	);
}

const style = {
	color: 'red',
}

export default errorField;