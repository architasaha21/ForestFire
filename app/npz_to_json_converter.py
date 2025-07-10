import numpy as np
import json
import os
import argparse

def convert_npz_to_json(npz_path, json_path, chunk_size=None):
    """
    Convert a .npz file containing latitude, longitude, and risk data to a JSON file.
    
    Parameters:
    -----------
    npz_path : str
        Path to the .npz file
    json_path : str
        Path where the JSON file will be saved
    chunk_size : int, optional
        If provided, splits the output into multiple JSON files with this many records each
    """
    print(f"Loading NPZ file from {npz_path}...")
    data = np.load(npz_path, allow_pickle=True)
    
    # Extract arrays
    latitude = data["latitude"]
    longitude = data["longitude"]
    risk = data["risk"].astype(str)
    
    print(f"Converting {len(latitude)} data points to JSON format...")
    
    # Create list of dictionaries
    json_data = []
    for lat, lon, r in zip(latitude, longitude, risk):
        json_data.append({
            "latitude": float(lat),
            "longitude": float(lon),
            "risk": r
        })
    
    if chunk_size is None:
        # Save as a single file
        with open(json_path, 'w') as f:
            json.dump(json_data, f)
        print(f"Saved JSON data to {json_path}")
    else:
        # Save in chunks
        base_name, ext = os.path.splitext(json_path)
        num_chunks = (len(json_data) + chunk_size - 1) // chunk_size
        
        for i in range(num_chunks):
            start_idx = i * chunk_size
            end_idx = min((i + 1) * chunk_size, len(json_data))
            chunk_data = json_data[start_idx:end_idx]
            
            chunk_path = f"{base_name}_chunk_{i+1}{ext}"
            with open(chunk_path, 'w') as f:
                json.dump(chunk_data, f)
            print(f"Saved chunk {i+1}/{num_chunks} to {chunk_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Convert NPZ fire risk data to JSON format')
    parser.add_argument('--input', default='sampled_data/fire_risk_demo_data_1mill.npz',
                        help='Path to the input NPZ file')
    parser.add_argument('--output', default='sampled_data/fire_risk_data.json',
                        help='Path to the output JSON file')
    parser.add_argument('--chunk-size', type=int, default=None,
                        help='Split output into chunks with this many records each')
    
    args = parser.parse_args()
    
    # Make sure the output directory exists
    os.makedirs(os.path.dirname(args.output), exist_ok=True)
    
    convert_npz_to_json(args.input, args.output, args.chunk_size) 