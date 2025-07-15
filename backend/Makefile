lint:
	flake8 . --exclude=env,.env,migrations,__pycache__
	black . --check --exclude '(env|\.env|migrations|__pycache__)'
	isort . --check-only --skip env --skip .env --skip migrations --skip __pycache__

format:
	black . --exclude '(env|\.env|migrations|__pycache__)'
	isort . --skip env --skip .env --skip migrations --skip __pycache__
test:
	pytest --cov=backend --cov-report=term-missing --cov-report=html
	coverage html