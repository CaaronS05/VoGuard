# VoGuard Dataset Folder

This MVP currently uses rule-based signal analysis, not machine-learning training.

Use these folders for future experiments:

- `datasets/real/` for real human voice samples.
- `datasets/manipulated/` for synthetic, replayed, pitch-shifted, or voice-changed samples.

Do not automatically download datasets into this repository. Add only datasets that you are allowed to use, and document their license and source before training any future model.

Future extension ideas:

- Train a supervised classifier from labeled real/manipulated samples.
- Compare the current prototype score against model predictions.
- Add dataset metadata, splits, and evaluation reports.
- Keep the UI wording honest: this remains a risk indication workflow unless validated for production.
