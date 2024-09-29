from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def hello():
    return {'mesg': 'hello'}

if __name__ == '__main__':
    import uvicorn

    uvicorn.run('main:app', host='0.0.0.0')