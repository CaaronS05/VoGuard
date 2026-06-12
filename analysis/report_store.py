import json
from pathlib import Path
from typing import Any, Dict, List, Optional


class SessionStore:
    def __init__(self, data_path: str = "data/sessions.json") -> None:
        self.data_path = Path(data_path)
        self.data_path.parent.mkdir(parents=True, exist_ok=True)
        if not self.data_path.exists():
            self.data_path.write_text("[]\n", encoding="utf-8")

    def all(self) -> List[Dict[str, Any]]:
        try:
            data = json.loads(self.data_path.read_text(encoding="utf-8"))
            return data if isinstance(data, list) else []
        except (json.JSONDecodeError, OSError):
            return []

    def add(self, session: Dict[str, Any]) -> Dict[str, Any]:
        sessions = self.all()
        sessions.insert(0, session)
        self.data_path.write_text(json.dumps(sessions, indent=2), encoding="utf-8")
        return session

    def get(self, session_id: str) -> Optional[Dict[str, Any]]:
        return next((session for session in self.all() if session.get("session_id") == session_id), None)
