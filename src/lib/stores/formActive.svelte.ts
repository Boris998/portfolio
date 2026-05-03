let formActive = $state(false);

export function getFormActive() {
	return formActive;
}

export function setFormActive(value: boolean) {
	formActive = value;
}
