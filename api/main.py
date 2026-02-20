from fastapi import FastAPI, HTTPException, Request, Query, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
import random
import httpx
import os
from dotenv import load_dotenv
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from async_lru import alru_cache

load_dotenv()
API_KEY = os.getenv("API_KEY")

app = FastAPI()

# Rate Limiter 설정
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/")
def home():
    return {"message": "여기는 HOME입니다."}

@app.get("/api/about")
def about():
    return {"message": "Service is running"}

@app.get("/api/characteristics")
def characteristics():  
    characteristics = [
        "귀여운",
        "쏘 쿨한",
        "똑똑한",
        "멋진",
        "매력적인",
        "섹시한",
        "마냥 즐거운",
        "쏘쏘한",
        "피곤한"
    ]
    return { "characteristics": random.choice(characteristics) }

# 랜덤 동물
@app.get("/api/random-cat")
def random_cat():
    url = "https://api.thecatapi.com/v1/images/search?limit=6" 
    response = httpx.get(url)
    cats = response.json()

    #받아온 데이터 리턴하기
    return cats



@app.get("/api/quote")
def quote():
    quotes = [
        "성공의 비결은 시작하는 것입니다. 제 페이지처럼요.",
        "어제보다 나은 오늘, 그리고 내일은... 아마 더 잘 거 같아요.",
        "세상에 나쁜 개는 없다지만, 가끔 나쁜 코드는 있더라고요.",
        "지금 이 문구를 보고 계신다면, 당신은 이미 제 페이지에 중독되기 시작한 겁니다.",
        "지나친 방문은 작성자에게 큰 힘과 약간의 당혹감을 줍니다.",
        "여기는 100% 유기농으로 직접 재배한 코드만 사용합니다.",
        "실수는 신이 주신 선물입니다. 그래서 제 코드는 선물 꾸러미죠.",
        "인생은 짧고, 제 웹페이지의 스크롤은 더 짧습니다. 천천히 즐기세요.",
        "버그가 아니라 '의도하지 않은 창의적 기능'입니다. 놀라지 마세요.",
        "여기까지 읽으셨다니, 당신의 인내심에 경의를 표하며 오늘 행운을 빌어드립니다!"
        
    ]
    return { "quote": random.choice(quotes) }

# 캐싱된 API 호출 함수 (1시간 TTL) 
@alru_cache(ttl=3600)
async def fetch_festivals_from_api(pageNo: int, numOfRows: int, serviceKey: str):
    url = "http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api"
    # httpx 타임아웃 설정 (10초)
    async with httpx.AsyncClient(timeout=10.0) as client:
        # 안전한 쿼리 스트링 구성
        request_url = f"{url}?serviceKey={serviceKey}&pageNo={pageNo}&numOfRows={numOfRows}&type=json"
        
        try:
            response = await client.get(request_url)
            response.raise_for_status() # 4xx, 5xx 에러 시 예외 발생
            return response.json()
        except httpx.HTTPStatusError as e:
            print(f"External API Error: {e.response.status_code} - {e.response.text}")
            raise HTTPException(status_code=503, detail="External API call failed")
        except httpx.RequestError as e:
            print(f"External API Connection Error: {e}")
            raise HTTPException(status_code=503, detail="External API connection failed")
        except Exception as e:
            print(f"Unknown Error: {e}")
            raise HTTPException(status_code=500, detail="Internal Server Error")

@app.get("/api/festivals")
@limiter.limit("60/minute") # 분당 60회 속도 제한
async def get_festivals(
    request: Request,
    pageNo: int = Query(1, ge=1, description="페이지 번호 (1 이상)"),
    numOfRows: int = Query(100, ge=1, le=100, description="한 페이지 결과 수 (1~100)")
):
    # 캐싱된 함수 호출
    result = await fetch_festivals_from_api(pageNo, numOfRows, API_KEY)
    return result   