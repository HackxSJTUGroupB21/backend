import os
import argparse
from solver import Solver
from data_loader import get_loader
from torch.backends import cudnn

class Config(object):
    pass

def str2bool(v):
    return v.lower() in ('true')

def predict(sample_dir = 'stargan_both/samples'):
    config = Config()
    config.c_dim = 6
    config.c2_dim = 8
    config.dataset = 'Both'
    config.batch_size = 16
    config.num_iters = 200000
    config.num_iters_decay = 100000
    config.g_lr = 0.0001
    config.d_lr = 0.0001
    config.selected_attrs = ['Black_Hair', 'Blond_Hair', 'Brown_Hair', 'Male', 'Young', 'Smiling']
    config.test_iters = 200000
    config.num_workers = 1
    config.mode = 'test'
    config.use_tensorboard = False
    config.model_save_dir = 'stargan_both/models'
    config.sample_dir = sample_dir
    config.log_dir = 'stargan_both/logs'
    config.result_dir = 'stargan_both/results'
    config.log_step = 10
    config.sample_step = 1000
    config.model_save_step = 10000
    config.lr_update_step = 1000
    config.celeba_image_dir = None
    config.attr_path = None
    config.celeba_crop_size = 178
    config.image_size = 256

    config.g_conv_dim = 64
    config.d_conv_dim = 64
    config.g_repeat_num = 6
    config.d_repeat_num = 6
    config.lambda_cls = 1
    config.lambda_rec = 10
    config.lambda_gp = 10


    config.n_critic = 5
    config.beta1 = 0.5
    config.beta2 = 0.999
    config.resume_iters = None

    # Create directories if not exist.
    if not os.path.exists(config.log_dir):
        os.makedirs(config.log_dir)
    if not os.path.exists(config.model_save_dir):
        os.makedirs(config.model_save_dir)
    if not os.path.exists(config.sample_dir):
        os.makedirs(config.sample_dir)
    if not os.path.exists(config.result_dir):
        os.makedirs(config.result_dir)

    # Data loader.
    celeba_loader = None
    rafd_loader = None

    celeba_loader = get_loader(config.celeba_image_dir, config.attr_path, config.selected_attrs,
                                config.celeba_crop_size, config.image_size, config.batch_size,
                                'CelebA', config.mode, config.sample_dir, config.num_workers)
    solver = Solver(celeba_loader, rafd_loader, config)
    solver.test_multi()